const router = require('express').Router();
const { setComment } = require('../controllers/commentController');

router.route('/:newsId')
      .post(setComment)

module.exports = router;