const router = require('express').Router();
const { getAllNews } = require('../controllers/newsController')

router.route('/')
    .get(getAllNews)

module.exports = router;