const router = require('express').Router();
const { getHomePage } = require('../controllers/homeController');

module.exports = router.get('/',getHomePage);