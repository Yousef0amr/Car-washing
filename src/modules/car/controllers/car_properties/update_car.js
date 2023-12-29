const wrap = require('express-async-wrapper')
const Car = require('./../../car.model')
const { Success } = require('../../../../utils/apiResponse')

const updateCar = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const car = await Car.findByIdAndUpdate(req.params.id, value, { new: true })

        return Success(res, "car updated successfully", { car })
    }
)


module.exports = updateCar