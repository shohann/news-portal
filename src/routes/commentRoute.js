const router = require('express').Router();
const { authorize, user } = require('../middlewares/authorize');
const { validateComment } = require('../middlewares/validate')
const { setComment } = require('../controllers/commentController');

router.route('/:newsId')
      .post(authorize, user, validateComment, setComment)

module.exports = router;