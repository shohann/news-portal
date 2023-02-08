const router = require('express').Router();
const { authorize, admin } = require('../middlewares/authorize');
const { pagination } = require('../middlewares/pagination');
const { validateCategory } = require('../middlewares/validate');
const { setCategory, getCategoryPage, getCategoryNewsPage } = require('../controllers/categoryController');

router.route('/')
      .get(authorize, admin, getCategoryPage)
      .post(authorize, admin, validateCategory, setCategory)

router.route('/all')
      .get(authorize, pagination ,getCategoryNewsPage)

module.exports = router;