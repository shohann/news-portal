const router = require('express').Router();
const { validateUser } = require('../middlewares/validate');
const { authorize } = require('../middlewares/authorize')
const { signUp, logIn, logout, signUpPage, logInPage, getAdminDashboardPage, getPublisherDashboardPage } = require('../controllers/userController');


router.route('/signup')
    .get(authorize,signUpPage)
    .post(validateUser, signUp);

router.route('/login')
    .get(authorize,logInPage)
    .post(logIn);

router.route('/logout')
    .get(authorize,logout);
    

// try also with router.get().because router.route is used for multiple similar type route
router.route('/admin/dashboard')
    .get(getAdminDashboardPage);

router.route('/publisher/dashboard')
    .get(getPublisherDashboardPage);



module.exports = router;