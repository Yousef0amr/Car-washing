const wrap = require('express-async-wrapper')
const Car = require('./../../car.model')
const { Success } = require('./../../../../utils/apiResponse')

const deleteCar = wrap(
    async (req, res, next) => {
        const id = req.params.id

        await Car.findByIdAndDelete(id)

        return Success(res, "Deleted Successfully")
    }
)


module.exports = deleteCar