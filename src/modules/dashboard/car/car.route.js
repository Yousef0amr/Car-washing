const express = require('express');
const addCar = require('./car_properties/add');
const getAllCars = require('./car_properties/getAll');


const carRouter = express.Router();


carRouter.route('add-car')
    .post(addCar)

carRouter.route('get-all-car')
    .get(getAllCars)








module.exports = carRouter