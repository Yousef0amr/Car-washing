const wrap = require('express-async-wrapper')
const Service = require('../service.model')
const { Success } = require('../../../../utils/apiResponse')
const create = require('../../../../common/DB_operation/CRUD/create')

const addService = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const service = create(Service, value)

        return Success(res, { service })
    }
)


module.exports = addService