const { Category } = require('../models/category');

module.exports.createCategory = async (category) => {
    const newCategory = new Category(category);
    return await newCategory.save();
};

// Transaction
module.exports.fetchCategory = async (categoryName, session) => {
    return await Category.findOne({ categoryName: categoryName }, null ,{ session: session })
                         .select({ news: 0, __v: 0 }).orFail()
}

// Admin pannel
module.exports.fetchAllCategory = async () => {
    return await Category.find()
                         .select({ news: 0, __v: 0 });
}

module.exports.fetchCategoryNews = async (categoryName) => {
    return await Category.findOne({ categoryName: categoryName })
                     .select({ __v: 0 })
                     .populate('news')
}



// module.exports.updateCategoriesNewsById = async (categoryId, newsId, session) => {
//     return await Category.updateOne({
//         _id: categoryId
//     },{
//         $push: {
//             news: newsId
//         }
//     }, { session: session });
// }

module.exports.updateCategoriesNewsById = async (categoryId, newsId, session) => {
    return await Category.updateOne({
        _id: categoryId
    },{
        $push: {
            news: newsId
        }
    }, { session: session });
}

// module.exports.upd = async (categoryName, newsId, session) => {
//     return await Category.findOneAndUpdate({ categoryName: categoryName})
// }