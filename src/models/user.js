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
        role: {
            type: String,
            enum: ['user', 'admin', 'publisher'],
            default: 'user'
        },
        
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        news: [
            {
                type: Schema.Types.ObjectId,
                ref: 'News'
            }
        ]
    })
);