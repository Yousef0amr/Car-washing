const wrap = require('express-async-wrapper')
const { Success } = require('../../../utils/apiResponse')
const Studio = require('../studio.model')
const { studioFilter } = require('../../../utils/filters')

const getPopularStudios = wrap(
    async (req, res, next) => {
        const limit = req.query.limit || 10
        const studios = await Studio.find({}, { ...studioFilter }).limit(limit).sort({ ratingsAvg: 1 })
        return Success(res, "Ok", { studios });
    }
)

module.exports = getPopularStudios