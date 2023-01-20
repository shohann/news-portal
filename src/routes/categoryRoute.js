const router = require('express').Router();
const { setCategory } = require('../controllers/categoryController');

router.route('/')
      .post(setCategory)

module.exports = router;