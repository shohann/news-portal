const { Schema, model } = require('mongoose');

module.exports.Category = model(
    'Category', 
    Schema({
        categoryName: {
            type: String,
            requred: true,
        },
        news: [
            {
                type: Schema.Types.ObjectId,
                ref: 'News'
            }
        ]
    })
);