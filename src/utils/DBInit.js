const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const DBInit = async (DBUrl) => {
    return await mongoose.connect(DBUrl,  { useNewUrlParser: true });
};

module.exports.DBInit = DBInit ; 