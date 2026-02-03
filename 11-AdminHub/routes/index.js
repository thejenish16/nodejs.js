const express = require('express');
const multer = require('multer');
const passport = require('passport');
const Admin = require('../model/admin.model');
const {
    dashborad,
    viewadmin,
    addAdmin,
    addAdminPage,
    deleteAdmin,
    editAdmin,
    updateAdmin,
    loginPage,
    logout,
    changePasswordPage,
    changePassword,
    profile,
    verifyEmail,
    otpPage,
    VerifyOtp,
    forgotPasswordPage,
    forgotPassword
} = require('../controller/admin.controller');

const adminRoutes = express.Router();

// Admin Auth Middleware
const checkAdminAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/admin')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage })

// Public routes (no auth required)
adminRoutes.get('/', loginPage)
adminRoutes.get('/forgot-pass', (req, res) => res.render('auth/verifyEmail'))
adminRoutes.get('/Otp-Page', otpPage);
adminRoutes.get('/new-password', forgotPasswordPage);
adminRoutes.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}))
adminRoutes.post('/verify-email', verifyEmail)
adminRoutes.post('/verify-otp', VerifyOtp)
adminRoutes.post('/new-password', forgotPassword)

// Protected routes (auth required)
adminRoutes.get('/viewAdmin', checkAdminAuth, viewadmin)
adminRoutes.get('/addAdmin', checkAdminAuth, addAdminPage)
adminRoutes.get('/deleteAdmin/:id', checkAdminAuth, deleteAdmin)
adminRoutes.get('/editAdmin/:id', checkAdminAuth, editAdmin)
adminRoutes.get('/dashboard', checkAdminAuth, dashborad)
adminRoutes.get('/logout', logout)
adminRoutes.get('/change-password', checkAdminAuth, changePasswordPage)
adminRoutes.get('/profile', checkAdminAuth, profile);

// Protected POST routes
adminRoutes.post('/addAdmin', checkAdminAuth, upload.single('profile_image'), addAdmin)
adminRoutes.post('/updateAdmin/:id', checkAdminAuth, upload.single('profile_image'), updateAdmin)
adminRoutes.post('/change-password', checkAdminAuth, changePassword)


module.exports = adminRoutes;