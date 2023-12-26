const wrap = require('express-async-wrapper')
const Car = require('./../../car.model')
const { Success } = require('./../../../../utils/apiResponse')
const getAll = require('./../../../../common/DB_operation/CRUD/getAll')

const getAllCars = wrap(
    async (req, res, next) => {
        const cars = await getAll(Car)
        return Success(res, "OK", { cars })
    }
)


module.exports = getAllCars