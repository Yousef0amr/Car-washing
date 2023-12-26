
const wrap = require('express-async-wrapper')
const Studio = require('./../studio.model')
const { Success } = require('../../../utils/apiResponse')
const getAll = require('../../../common/DB_operation/CRUD/getAll')

const getAllStudios = wrap(
    async (req, res, next) => {
        const studios = await getAll(Studio)
        return Success(res, "OK", { studios })
    }
)


module.exports = getAllStudios