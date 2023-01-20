const { createCategory } = require('../services/categoryService')

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
}