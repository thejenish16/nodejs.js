const express = require('express');
const { registerAdmin, loginAdmin, Fetchadmins } = require('../../../controllers/auth/admin/admin.controller');

const adminRoute = express.Router();

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));

adminRoute.post('/register', registerAdmin);
adminRoute.post('/login', loginAdmin);
adminRoute.get('/' , Fetchadmins)

// localhost:8000/api/auth/admin/register
// localhost:8000/api/auth/admin/login

module.exports = adminRoute;