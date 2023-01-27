const router = require('express').Router();
const { getHomePage } = require('../controllers/homeController');
const { authorize } = require('../middlewares/authorize');

module.exports = router.get('/', authorize, getHomePage);