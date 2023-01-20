const { Schema, model } = require('mongoose');

module.exports.User = model(
    'User', 
    Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String,
        news: [
            {
                type: Schema.Types.ObjectId,
                ref: 'News'
            }
        ]
    })
);