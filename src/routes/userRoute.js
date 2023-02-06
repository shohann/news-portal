const router = require('express').Router();
const { validateUser } = require('../middlewares/validate');
const { authorize, publisher } = require('../middlewares/authorize');
const { signUp, logIn, logout, signUpPage, logInPage, getAdminDashboardPage, getPublisherDashboardPage, getPublisherNewsPage } = require('../controllers/userController');

router.route('/signup')
    .get(authorize,signUpPage)
    .post(validateUser, signUp);

router.route('/login')
    .get(authorize,logInPage)
    .post(logIn);

router.route('/logout')
    .get(authorize,logout);
    
// /dashboard

// try also with router.get().because router.route is used for multiple similar type route
router.route('/admin/dashboard')
    .get(getAdminDashboardPage);

router.route('/publisher/dashboard')
    .get(getPublisherDashboardPage);

router.route('/mynews')
      .get(authorize, publisher, getPublisherNewsPage);

module.exports = router;