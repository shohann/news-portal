const router = require('express').Router();
const { authorize } = require('../middlewares/authorize')
const { setCategory, getCategoryPage, getCategoryNewsPage } = require('../controllers/categoryController');

router.route('/')
      .get(authorize, getCategoryPage) // by admin
      .post(authorize, setCategory) // by admin

router.route('/all')
      .get(authorize,getCategoryNewsPage)

module.exports = router;