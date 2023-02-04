const { Schema, model } = require('mongoose');

module.exports.Comment = model(
    'Comment', 
    Schema({
        commentText: {
            type: String,
            required: true
            
        },
        publishTime: { 
            type: Date, 
            default: Date.now 
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        news: {
            type: Schema.Types.ObjectId,
            ref: 'News'
        }
    })
);