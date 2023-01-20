const router = require('express').Router();
const { setNews, getNews } = require('../controllers/newsController')

router.route('/')
    .post(setNews)

router.route('/:newsId')
      .get(getNews)

module.exports = router;