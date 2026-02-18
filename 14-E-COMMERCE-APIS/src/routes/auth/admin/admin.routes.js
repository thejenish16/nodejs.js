const express = require('express');
const { registerAdmin } = require('../../../controller/auth/admin/admin.controller');
const adminRouter = express.Router();

adminRouter.use('/registerAdmin', registerAdmin);

module.exports = adminRouter;