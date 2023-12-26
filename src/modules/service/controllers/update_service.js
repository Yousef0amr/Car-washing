const wrap = require('express-async-wrapper')
const Service = require('../service.model')
const { Success } = require('../../../utils/apiResponse')
const updateByID = require('../../../common/DB_operation/CRUD/updateByID')

const updateService = wrap(
    async (req, res, next) => {
        const id = req.query.id
        const value = { ...req.body }
        const service = await updateByID(Service, id, value);

        return Success(res, "service updated successfully", service)
    }
)


module.exports = updateService