const { createUser, fetchUserByEmail } = require('../services/userService');
const { generateAccessToken } = require('../utils/jwt');
const { getSaltRounds } = require('../utils/configs');
const { genSalt, hash, compare } = require('bcrypt');

module.exports.signUp = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const salt = await genSalt(getSaltRounds());
        const hashedPassword = await hash(password, salt);
        const newUser = await createUser({
            name: name,
            email: email,
            password: hashedPassword
        });
        const token = generateAccessToken(newUser._id, email, newUser.role)
        res.send(token);
    } catch (error) {
        if (error.code === '11000') {
            res.send('User already have an account');
        } else {
            res.send('Internal Server Error')
        }
    }
}

module.exports.logIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await fetchUserByEmail(email);

        if (!user || !(await compare(password, user.password))) {
            const e = new Error('Invalid email or password')
            e.name = "InvalidEmailPassword";
            throw e;
            // throw new Error('Invalid email or password', { cause: 'InvalidCredentials' })
        }

        const token = generateAccessToken(user._id,user.email, user.role)
        res.send(token) ;
    } catch (error) {
        if (error.name === 'InvalidEmailPassword') {
            console.log(error.message);
            res.send(error.message)
        } else {
            console.log('Internal server error');
            res.send('Internal server error')
        }
        
    }
}   