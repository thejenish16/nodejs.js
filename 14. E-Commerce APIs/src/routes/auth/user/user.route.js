const express = require('express');
const { registerUser, loginUser } = require('../../../controllers/auth/user/user.controller');

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

// localhost:8000/api/auth/user/register
// localhost:8000/api/auth/user/login

module.exports = userRoute;