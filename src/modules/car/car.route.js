const express = require('express');
const addCar = require('./controllers/car_properties/add_car');
const deleteCar = require('./controllers/car_properties/delete_car');
const getAllCars = require('./controllers/car_properties/getAllCars');
const { multerConfig } = require('./../../utils/multer')
const validateCar = require('./validators/validate-car')

const carRouter = express.Router({ mergeParams: true });


carRouter.route('/')
    .post(
        multerConfig().fields([
            { name: 'logo', maxCount: 1 }
        ]),
        validateCar(),
        addCar
    )
    .get(getAllCars)



carRouter.route('/:id')
    .patch()
    .delete(deleteCar)



module.exports = carRouter