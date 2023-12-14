const wrap = require('express-async-wrapper')
const Car = require('./../car.model')
const { Success } = require('./../../../../utils/apiResponse')
const create = require('../../../../common/DB_operation/CRUD/create')

const addCar = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const car = create(Car, value)

        Success(res, { car })
    }
)


module.exports = addCar