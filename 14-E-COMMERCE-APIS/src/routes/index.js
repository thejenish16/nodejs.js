const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/admin/admin.routes'));
router.use('/auth', require('./auth/user/user.routes'));

module.exports = router;