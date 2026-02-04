const express = require('express');
const passport = require('passport');
const upload = require('../middleware/multer.middleware');

const {
    dashborad,
    viewadmin,
    addAdmin,
    addAdminPage,
    deleteAdmin,
    editAdmin,
    updateAdmin,
    loginPage,
    login,
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
// Login
adminRoutes.get('/', passport.checkAuthIsNotDone, loginPage);

// Forgot password page
adminRoutes.get('/forgot-password', passport.checkAuthIsNotDone, (req, res) => {
    res.render('auth/forgotPassword', {
        errorMessage: req.session.errorMessage,
        successMessage: req.session.successMessage
    });
    req.session.errorMessage = null;
    req.session.successMessage = null;
});

adminRoutes.post(
    '/login',
    passport.checkAuthIsNotDone,
    (req, res, next) => {
        passport.authenticate('localAuth', (err, user, info) => {
            if (err) {
                req.session.errorMessage = "Login failed. Please try again.";
                return res.redirect('/');
            }
            if (!user) {
                req.session.errorMessage = "Invalid email or password.";
                return res.redirect('/');
            }
            req.logIn(user, (err) => {
                if (err) {
                    req.session.errorMessage = "Login failed. Please try again.";
                    return res.redirect('/');
                }
                return login(req, res, next);
            });
        })(req, res, next);
    }
);

// Forgot password – email verify
adminRoutes.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);

// OTP
adminRoutes.get('/Otp-Page', passport.checkAuthIsNotDone, otpPage);
adminRoutes.post('/VerifyOtp', passport.checkAuthIsNotDone, VerifyOtp);

// New password
adminRoutes.get('/forgot-pass', passport.checkAuthIsNotDone, forgotPasswordPage);
adminRoutes.post('/forgot-pass', passport.checkAuthIsNotDone, forgotPassword);

// Dashboard
adminRoutes.get('/dashboard', passport.checkAuthIsDone, dashborad);

// Admin CRUD
adminRoutes.get('/viewAdmin', passport.checkAuthIsDone, viewadmin);
adminRoutes.get('/addAdmin', passport.checkAuthIsDone, addAdminPage);
adminRoutes.post(
    '/addAdmin',
    passport.checkAuthIsDone,
    upload.single('profile_image'),
    addAdmin
);

adminRoutes.get('/editAdmin/:id', passport.checkAuthIsDone, editAdmin);
adminRoutes.post(
    '/updateAdmin/:id',
    passport.checkAuthIsDone,
    upload.single('profile_image'),
    updateAdmin
);

adminRoutes.get('/deleteAdmin/:id', passport.checkAuthIsDone, deleteAdmin);

// Profile
adminRoutes.get('/profile', passport.checkAuthIsDone, profile);

// Change password (logged in)
adminRoutes.get('/change-password', passport.checkAuthIsDone, changePasswordPage);
adminRoutes.post('/change-password', passport.checkAuthIsDone, changePassword);

// Logout
adminRoutes.get('/logout', passport.checkAuthIsDone, logout);

module.exports = adminRoutes;