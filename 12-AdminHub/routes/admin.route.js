const express = require('express');
const upload = require("../middleware/multer.middleware");
const { addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin } = require('../controller/admin.controller');

const adminRoute = express.Router();

adminRoute.get('/addAdminPage', addAdminPage);
adminRoute.get('/viewAdminPage', viewAdminPage);

// Insert Admin
adminRoute.post('/insertAdmin', upload.single('profile_image'), insertAdmin);

// Delete Admin
adminRoute.get('/deleteAdmin', deleteAdmin);

// Edit Admin
adminRoute.get('/editAdmin/:adminId', editAdminPage);
adminRoute.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);


module.exports = adminRoute;