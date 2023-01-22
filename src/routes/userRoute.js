const router = require('express').Router();
const { validateUser } = require('../middlewares/validate')
const { signUp, logIn, signUpPage, logInPage, getAdminDashboardPage } = require('../controllers/userController');

router.route('/signup')
    .get(signUpPage)
    .post(validateUser, signUp);

router.route('/login')
    .get(logInPage)
    .post(logIn);

// try also with router.get().because router.route is used for multiple similar type route
router.route('/admin/dashboard')
    .get(getAdminDashboardPage);

module.exports = router;