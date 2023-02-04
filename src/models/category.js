const { Schema, model } = require('mongoose');

module.exports.Category = model(
    'Category', 
    Schema({
        categoryName: {
            type: String,
            required: true
        },
        news: [
            {
                type: Schema.Types.ObjectId,
                ref: 'News'
            }
        ]
    })
);