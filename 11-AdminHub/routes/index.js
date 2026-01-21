const express = require('express');
const multer = require('multer');
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

// Admin Auth Middleware
const checkAdminAuth = async (req, res, next) => {
    try {
        if (!req.cookies.adminId) {
            return res.redirect('/');
        }
        const admin = await Admin.findById(req.cookies.adminId);
        if (!admin) {
            return res.redirect('/');
        }
        req.admin = admin;
        next();
    } catch (error) {
        return res.redirect('/');
    }
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
adminRoutes.get('/Otp-Page', otpPage);
adminRoutes.get('/forgot-pass', forgotPasswordPage);
adminRoutes.post('/login', login)
adminRoutes.post('/VerifyOtp', VerifyOtp)
adminRoutes.post('/forgot-pass', forgotPassword)
adminRoutes.post('/verify-email', verifyEmail)

// Protected routes (auth required)
adminRoutes.get('/viewAdmin', checkAdminAuth, viewadmin)
adminRoutes.get('/addAdmin', checkAdminAuth, addAdminPage)
adminRoutes.get('/deleteAdmin/:id', checkAdminAuth, deleteAdmin)
adminRoutes.get('/editAdmin/:id', checkAdminAuth, editAdmin)
adminRoutes.get('/dashboard', checkAdminAuth, dashborad)
adminRoutes.get('/logout', checkAdminAuth, logout)
adminRoutes.get('/change-password', checkAdminAuth, changePasswordPage)
adminRoutes.get('/profile', checkAdminAuth, profile);

// Protected POST routes
adminRoutes.post('/addAdmin', checkAdminAuth, upload.single('profile'), addAdmin)
adminRoutes.post('/updateAdmin/:id', checkAdminAuth, upload.single('profile'), updateAdmin)
adminRoutes.post('/change-password', checkAdminAuth, changePassword)


module.exports = adminRoutes;