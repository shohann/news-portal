const { createCategory } = require('../services/categoryService');

module.exports.getCategoryPage = async (req, res) => {
    try {
        res.status(200).render('categories')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};

module.exports.setCategory = async (req, res) => {
    const categoryName = req.body.categoryName;
    try {
        const newCategory = await createCategory({
            categoryName: categoryName
        })
        res.send(newCategory);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};