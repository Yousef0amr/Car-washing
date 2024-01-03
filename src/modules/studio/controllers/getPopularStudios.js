const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../utils/apiResponse')
const Studio = require('./../studio.model')
const Service = require('./../../service/service.model')

const getPopularStudios = wrap(
    async (req, res, next) => {


        const popularStudios = await Studio.aggregate([
            {
                $unwind: '$services'
            },
            {
                $group: {
                    _id: '$services',
                    count: { $sum: 1 },
                    studios: {
                        $push: {
                            studioId: '$_id',
                            studioName: '$name',
                            location: '$location',
                            description: '$description',
                            logo: '$logo',
                            rating: '$ratingsAvg',
                            openTime: "$openTime",
                            closeTime: "$closeTime",
                            studio_images: "$studio_images"
                        }
                    }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $lookup: {
                    from: 'services',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'serviceDetails'
                }
            },
            {
                $project: {
                    _id: 0,
                    serviceId: '$_id',
                    serviceName: { $arrayElemAt: ['$serviceDetails.type', 0] },
                    count: 1,
                    studios: 1
                }
            }
        ]);
        return Success(res, "Ok", { popularStudios })
    }
)

module.exports = getPopularStudios