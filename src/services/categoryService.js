const { Category } = require('../models/category');

module.exports.createCategory = async (category) => {
    const newCategory = new Category(category);
    return await newCategory.save();
};

module.exports.updateCategoriesNewsById = async (categoryId, newsId) => {
    return await Category.updateOne({
        _id: categoryId
    },{
        $push: {
            news: newsId
        }
    });
}