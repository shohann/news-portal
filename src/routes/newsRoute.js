const router = require('express').Router();
const { setNews } = require('../controllers/newsController')

router.route('/')
    .post(setNews)

module.exports = router;