const express = require('express');
const routes = express.Router();

routes.use('/Cars', require('./Cars.routes'));

module.exports = routes;