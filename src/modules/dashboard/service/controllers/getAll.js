const wrap = require('express-async-wrapper')
const Service = require('../service.model')
const { Success } = require('../../../../utils/apiResponse')
const getAll = require('../../../../common/DB_operation/CRUD/getAll')

const getAllService = wrap(
    async (req, res, next) => {
        const services = await getAll(Service)
        Success(res, { services })
    }
)


module.exports = getAllService