const wrap = require('express-async-wrapper')
const Service = require('./../service.model')
const { Success } = require('./../../../../utils/apiResponse')

const addService = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const service = new Service({ ...value })
        await service.save()

        Success(res, { service })
    }
)


module.exports = addService