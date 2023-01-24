const router = require('express').Router();
const { setCategory, getCategoryPage } = require('../controllers/categoryController');

router.route('/')
      .get(getCategoryPage)
      .post(setCategory)

module.exports = router;