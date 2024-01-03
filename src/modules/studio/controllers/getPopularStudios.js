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
                    studios: {
                        $push: {
                            id: '$_id',
                            name: '$name',
                            location: '$location',
                            description: '$description',
                            logo: '$logo',
                            ratingsAvg: '$ratingsAvg',
                            openTime: '$openTime',
                            closeTime: '$closeTime',
                            studio_images: '$studio_images',
                            services: '$services' // Append the services array
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
                $unwind: '$serviceDetails'
            },
            {
                $group: {
                    _id: '$_id',
                    count: { $sum: 1 },
                    studios: {
                        $push: {
                            id: { $arrayElemAt: ['$studios.id', 0] },
                            name: { $arrayElemAt: ['$studios.name', 0] },
                            location: { $arrayElemAt: ['$studios.location', 0] },
                            description: { $arrayElemAt: ['$studios.description', 0] },
                            logo: { $arrayElemAt: ['$studios.logo', 0] },
                            ratingsAvg: { $arrayElemAt: ['$studios.ratingsAvg', 0] },
                            openTime: { $arrayElemAt: ['$studios.openTime', 0] },
                            closeTime: { $arrayElemAt: ['$studios.closeTime', 0] },
                            studio_images: { $arrayElemAt: ['$studios.studio_images', 0] },
                            services: '$serviceDetails'
                        }
                    }
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