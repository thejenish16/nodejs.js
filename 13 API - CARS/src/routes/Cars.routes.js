const express = require('express');

const { AddCars, GetCars, DeleteCars, UpdateCars } = require('../controller/Cars.controller');

const CarRoutes = express.Router();

CarRoutes.post('/', AddCars);
CarRoutes.get('/', GetCars);
CarRoutes.delete('/', DeleteCars)
CarRoutes.patch('/:id', UpdateCars)


module.exports = CarRoutes;