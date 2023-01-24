const { Category } = require('../models/category');

module.exports.createCategory = async (category) => {
    const newCategory = new Category(category);
    return await newCategory.save();
};

module.exports.fetchCategory = async (categoryName) => {
    return await Category.findOne({ categoryName: categoryName })
                         .select({ news: 0, __v: 0 }).orFail()
}

module.exports.fetchAllCategory = async () => {
    return await Category.find()
                         .select({ news: 0, __v: 0 });
}

module.exports.updateCategoriesNewsById = async (categoryId, newsId) => {
    return await Category.updateOne({
        _id: categoryId
    },{
        $push: {
            news: newsId
        }
    });
}