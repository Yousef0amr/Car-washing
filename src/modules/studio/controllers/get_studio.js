const wrap = require('express-async-wrapper')
const Studio = require('./../studio.model')
const { studioFilter } = require('./../../../utils/filters')
const { Success } = require('../../../utils/apiResponse')



const getStudio = wrap(
    async (req, res, next) => {
        const id = req.userId | req.params.id
        const studio = await Studio.findById(id, { ...studioFilter })
        Success(res, "OK", { studio })
    }
)



module.exports = getStudio