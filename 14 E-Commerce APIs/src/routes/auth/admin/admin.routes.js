const express = require('express');
const { registerAdmin, loginAdmin, forgotPassword, verifyOtp, resetPassword, fetchAllAdmin, deleteAdmin, updateAdmin, isActive, adminProfile, changePassword } = require('../../../controller/auth/admin/admin.controller');
const { authMiddleware } = require('../../../middleware/auth.middleware');
const adminRouter = express.Router();

adminRouter.post('/registerAdmin', registerAdmin);
adminRouter.post('/loginAdmin', loginAdmin);
adminRouter.post('/forgotPassword', forgotPassword);
adminRouter.post('/verifyOtp', verifyOtp);
adminRouter.post('/resetPassword', resetPassword);

adminRouter.get('/', authMiddleware, fetchAllAdmin);
adminRouter.delete('/', authMiddleware, deleteAdmin);
adminRouter.patch('/', authMiddleware, updateAdmin);
adminRouter.put('/', authMiddleware, isActive);
adminRouter.get('/profile', authMiddleware, adminProfile);

adminRouter.post('/changePassword', authMiddleware, changePassword);

module.exports = adminRouter;
