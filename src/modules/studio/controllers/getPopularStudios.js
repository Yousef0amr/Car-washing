const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../utils/apiResponse')
const Studio = require('./../studio.model')
const Service = require('./../../service/service.model')

const getPopularStudios = wrap(
    async (req, res, next) => {
        const serviceId = req.params.serviceId;
        const limit = req.query.limit || 10
        const isExist = Service.findById(serviceId);
        if (!isExist) {
            return next(new ApiError("service not found", 404));
        }
        const popularStudios = await Studio.find({
            services: serviceId,
            ratingsAvg: { $gte: 4.0 }
        }).sort({ ratingsAvg: -1 }).limit(limit);
        return Success(res, "Ok", { popularStudios })
    }
)

module.exports = getPopularStudios