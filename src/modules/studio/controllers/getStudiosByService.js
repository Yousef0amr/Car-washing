const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('../../../utils/apiResponse')
const Studio = require('../studio.model')
const Service = require('../../service/service.model')
const { studioFilter } = require('../../../utils/filters')

const getStudiosByService = wrap(
    async (req, res, next) => {
        const id = req.params.id
        const limit = req.query.limit || 10
        const service = await Service.findById(id);

        if (!service) {
            return next(new ApiError('invalid service id', 400))
        }

        const studios = await Studio.find({
            'services.service': id,
        }, { ...studioFilter }).limit(limit).sort({ ratingsAvg: 1 });


        if (!studios) {
            return next(new ApiError('no studios for this services', 400))
        }

        return Success(res, "Ok", { studios });
    }
)

module.exports = getStudiosByService