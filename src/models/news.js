const { Schema, model } = require('mongoose');

// publisher id and category id is required must
module.exports.News = model(
    'News', 
    Schema({
        header: {
            type: String,
            requred: true,
        },
        newsText: {
            type: String,
            requred: true,
        },
        publishTime: { 
            type: Date, 
            default: Date.now 
        },
        approval: {
            status: {
                type: Boolean,
                default: false
            },
            adminId: {
                type: Schema.Types.ObjectId,
            }
        },
        publisher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    })
);