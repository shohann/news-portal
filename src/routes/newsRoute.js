const router = require('express').Router();
const { setNews, getNews, modifyNewsApproval,getAllNewsPage, setNewsPage, searchNews } = require('../controllers/newsController');
const { authorize, admin } = require('../middlewares/authorize');

// /all -> For home page
router.route('/search')
    .post(searchNews)

router.route('/')
    .post(authorize, admin, setNews) // -> for publisher only
    .get(getAllNewsPage)

router.route('/add')
    .get(setNewsPage)

router.route('/:newsId')
      .get(authorize, getNews)
      .put(authorize, admin, modifyNewsApproval);

module.exports = router;