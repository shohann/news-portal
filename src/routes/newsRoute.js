const router = require('express').Router();
const { setNews, getNews, modifyNewsApproval } = require('../controllers/newsController');
const { authorize, admin } = require('../middlewares/authorize');


router.route('/')
    .post(authorize, admin, setNews) // -> for publisher only

router.route('/:newsId')
      .get(authorize, getNews)
      .put(authorize, admin, modifyNewsApproval);

module.exports = router;