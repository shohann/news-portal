const router = require('express').Router();
const { setNews, getNews } = require('../controllers/newsController');
const { authorize, admin } = require('../middlewares/authorize');


router.route('/')
    .post(setNews)

router.route('/:newsId')
      .get(authorize, admin, getNews)

module.exports = router;