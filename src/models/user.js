const { Schema, model } = require('mongoose');

module.exports.User = model(
    'User', 
    Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String
    })
);