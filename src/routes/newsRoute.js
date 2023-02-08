const router = require('express').Router();
const { setNews, getNews, modifyNewsApproval, 
        setNewsPage, searchNews, getUnapprovedNewsPage, 
        getApprovedNewsPage, removeNews } = require('../controllers/newsController');
const { authorize, admin, publisher } = require('../middlewares/authorize');
const { validateNews } = require('../middlewares/validate'); 
const { upload } = require('../middlewares/uploadFile'); 
const { uploadToCloud } = require('../middlewares/uploadToCloud');

router.route('/search')
    .get(authorize, searchNews);

router.route('/')
    .post(authorize, publisher, upload, validateNews, uploadToCloud, setNews) 
    .get(authorize, publisher, setNewsPage);

router.route('/:newsId')
      .get(authorize, getNews)
      .put(authorize, admin, modifyNewsApproval)
      .delete(authorize, admin, removeNews);

router.get('/all/u', authorize, admin, getUnapprovedNewsPage);
router.get('/all/a', authorize, admin, getApprovedNewsPage);

module.exports = router;