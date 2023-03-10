const { createUser, fetchUserByEmail, fetchUsersNewsById } = require('../services/userService');
const { generateAccessToken } = require('../utils/jwt');
const { getSaltRounds } = require('../utils/configs');
const { genSalt, hash, compare } = require('bcrypt'); // violate dependency injection & also cookie call
const { Unauthorized, Conflict } = require('../utils/appError');

const maxAge = 3 * 24 * 60 * 60; // constant

module.exports.signUpPage = async (req, res, next) => {
    try {
        res.status(200).render('signup');
    } catch (error) {
        next(error);
    }
};

module.exports.signUp = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const salt = await genSalt(getSaltRounds());
        const hashedPassword = await hash(password, salt);
        const newUser = await createUser({
            name: name,
            email: email,
            password: hashedPassword
        });
        const token = generateAccessToken(newUser._id, email, newUser.role);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({
            success: true,
            message: 'User Created'
        });
    } catch (error) {
        // Conflict Error or Other unknown error or Internal server error or orFail()-> DB error
        // error code is from mongoDB duplicate resource creation
        if (error.code === 11000) {
            next(new Conflict('User already have an account')); // instance of known error
        } else {
            next(error); // this error is not app error -> its unknown
        }
    }
};

module.exports.logInPage = async (req, res, next) => {
    try {
        res.status(200).render('login');
    } catch (error) {
        next(error);
    }
};

module.exports.logIn = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await fetchUserByEmail(email);
        if (!user || !(await compare(password, user.password))) {
            throw new Unauthorized("Invalid email or password");
        }
        const token = generateAccessToken(user._id,user.email, user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200)
            .json({
                success: true,
                message: 'Successfully LogedIn'
        });
    } catch (error) {
        // can be unauth or internal or other unknown or internal server
        next(error); 
    }
};

module.exports.logout = (req, res, next) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/api/users/login');
    } catch(error) {
        next(error);
    }
};

module.exports.getAdminDashboardPage = async (req, res, next) => {
    try {
        res.status(200).redirect('/api/categories');
    } catch (error) {
        console.log(error);
        next(error)
    }
};

module.exports.getPublisherDashboardPage = async (req, res, next) => {
    try {
        res.status(200).redirect('/api/news');
    } catch (error) {
        next(error);
    }
};

module.exports.getPublisherNewsPage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { news } = await fetchUsersNewsById(userId);
        res.status(200).render('my-news', { news: news});
    } catch (error) {
        next(error);
    }
};
