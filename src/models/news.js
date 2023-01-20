const { Schema, model } = require('mongoose');

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
        }
    })
);