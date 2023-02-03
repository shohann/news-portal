const router = require('express').Router();
const { authorize } = require('../middlewares/authorize');
const { pagination } = require('../middlewares/pagination')
const { setCategory, getCategoryPage, getCategoryNewsPage } = require('../controllers/categoryController');

router.route('/')
      .get(authorize, getCategoryPage) // by admin
      .post(authorize, setCategory) // by admin

router.route('/all')
      .get(authorize, pagination ,getCategoryNewsPage)

module.exports = router;