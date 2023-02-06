const router = require('express').Router();
const { authorize } = require('../middlewares/authorize');
const { validateComment } = require('../middlewares/validate')
const { setComment } = require('../controllers/commentController');

// authorize flow -> if req.locals.user === null then server will crash
router.route('/:newsId')
      .post(authorize, validateComment, setComment)

module.exports = router;