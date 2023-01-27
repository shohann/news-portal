const router = require('express').Router();
const { setCategory, getCategoryPage, getCategoryNewsPage } = require('../controllers/categoryController');

router.route('/')
      .get(getCategoryPage) // by admin
      .post(setCategory) // by admin

router.route('/all')
      .get(getCategoryNewsPage)

module.exports = router;