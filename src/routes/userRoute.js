const router = require('express').Router();
const { validateUser } = require('../middlewares/validate');
const { authorize, publisher, admin } = require('../middlewares/authorize');
const { signUp, logIn, logout, 
        signUpPage, logInPage, getAdminDashboardPage, 
        getPublisherDashboardPage, getPublisherNewsPage } = require('../controllers/userController');

router.route('/signup')
    .get(authorize,signUpPage)
    .post(validateUser, signUp);

router.route('/login')
    .get(authorize,logInPage)
    .post(logIn);

router.route('/logout')
    .get(authorize,logout);
    
router.route('/admin/dashboard')
    .get(authorize, admin, getAdminDashboardPage);

router.route('/publisher/dashboard')
    .get(authorize, publisher, getPublisherDashboardPage);

router.route('/mynews')
      .get(authorize, publisher, getPublisherNewsPage);

module.exports = router;