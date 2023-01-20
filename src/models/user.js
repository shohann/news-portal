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