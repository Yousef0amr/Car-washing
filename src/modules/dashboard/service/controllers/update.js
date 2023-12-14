const wrap = require('express-async-wrapper')
const Service = require('./../service.model')
const { Success } = require('./../../../../utils/apiResponse')

const updateService = wrap(
    async (req, res, next) => {
        const id = req.query.id
        const value = { ...req.body }
        await Service.findByIdAndUpdate(id, { type: value.type });

        Success(res, "service updated successfully")
    }
)


module.exports = updateService