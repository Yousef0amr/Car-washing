const wrap = require('express-async-wrapper')
const Service = require('./../service.model')
const { Success } = require('./../../../../utils/apiResponse')

const getAllService = wrap(
    async (req, res, next) => {
        const services = await Service.find({})
        Success(res, { services })
    }
)


module.exports = getAllService