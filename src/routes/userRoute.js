const router = require('express').Router();
const { validateUser } = require('../middlewares/validate')
const { signUp, logIn } = require('../controllers/userController');

router.route('/signup')
    .post(validateUser, signUp);

router.route('/login')
    .post(logIn);

module.exports = router;