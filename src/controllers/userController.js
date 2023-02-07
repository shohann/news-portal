const { createUser, fetchUserByEmail, fetchUsersNewsById } = require('../services/userService');
const { generateAccessToken } = require('../utils/jwt');
const { getSaltRounds } = require('../utils/configs');
const { genSalt, hash, compare } = require('bcrypt');
const { setCustomError } = require('../utils/appError');
const maxAge = 3 * 24 * 60 * 60;

module.exports.signUpPage = async (req, res) => {
    try {
        res.status(200).render('signup');
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.signUp = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // amn user k sign in kora jabe jeta already ase
    // duplicate er jonno error code kaj korse na
    try {
        const salt = await genSalt(getSaltRounds());
        const hashedPassword = await hash(password, salt);
        const newUser = await createUser({
            name: name,
            email: email,
            password: hashedPassword
        });
        const token = generateAccessToken(newUser._id, email, newUser.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.send(newUser);
    } catch (error) {
        if (error.code === '11000') {
            res.send('User already have an account');
        } else {
            res.send('Internal Server Error')
        }
    }
};

module.exports.logInPage = async (req, res) => {
    try {
        res.status(200).render('login');
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.logIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const user = await fetchUserByEmail(email);
        if (!user || !(await compare(password, user.password))) throw setCustomError("InvalidEmailPassword", 401, "Invalid email or password");
        const token = generateAccessToken(user._id,user.email, user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        if (error.name === 'InvalidEmailPassword') {
            next(error);
        } else {
            error.isOperational = false;
            next(error);
        }
    }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/api/users/login');
};

module.exports.getAdminDashboardPage = async (req, res) => {
    try {
        res.status(200).redirect('/api/categories');
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.getPublisherDashboardPage = async (req, res) => {
    try {
        res.status(200).redirect('/api/news');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports.getPublisherNewsPage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { news } = await fetchUsersNewsById(userId);
        res.status(200).render('my-news', { news: news});
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};
