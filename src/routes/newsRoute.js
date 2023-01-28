const router = require('express').Router();
const { setNews, getNews, modifyNewsApproval,getAllNewsPage, setNewsPage, searchNews } = require('../controllers/newsController');
const { authorize, admin, publisher } = require('../middlewares/authorize');

// /all -> For home page
router.route('/search')
    .get(searchNews)

router.route('/')
    .post(authorize, publisher, setNews) // -> for publisher only
    .get(authorize, publisher, setNewsPage)
    // .get(getAllNewsPage)

// router.route('/add')
//     .get(setNewsPage)

router.route('/:newsId')
      .get(authorize, getNews)
      .put(authorize, admin, modifyNewsApproval);

module.exports = router;