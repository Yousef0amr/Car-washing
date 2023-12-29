const express = require('express');
const addCar = require('./controllers/car_properties/add_car');
const deleteCar = require('./controllers/car_properties/delete_car');
const getAllCars = require('./controllers/car_properties/getAllCars');
const { multerConfig } = require('./../../utils/multer')
const validateCar = require('./validators/validate-car');
const updateCar = require('./controllers/car_properties/update_car');
const validateParamsId = require('../../middlewares/validateParamsId');
const addBrand = require('./controllers/brand/add_brand');
const removeBrand = require('./controllers/brand/remove_brand');
const addModel = require('./controllers/model/add_model');
const removeModel = require('./controllers/model/remove_model');
const validateBrand = require('./validators/validate-brand');
const validateModel = require('./validators/validate-model');

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
    .delete(validateParamsId(), deleteCar)
    .patch(validateParamsId(), updateCar)

carRouter.route('/brands/:id')
    .delete(validateParamsId(), validateBrand(), removeBrand)
    .post(validateParamsId(), validateBrand(), addBrand)

carRouter.route('/models/:id')
    .delete(validateParamsId(), validateModel(), removeModel)
    .post(validateParamsId(), validateModel(), addModel)


module.exports = carRouter