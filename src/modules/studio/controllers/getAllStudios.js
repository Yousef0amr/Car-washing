
const wrap = require('express-async-wrapper')
const Studio = require('./../studio.model')
const { Success, ApiError } = require('../../../utils/apiResponse')
const getAll = require('../../../common/DB_operation/CRUD/getAll')
const { studioFilter } = require('./../../../utils/filters')

const getAllStudios = wrap(
    async (req, res, next) => {
        const query = {}

        if (req.query.nearest) {
            const { lat, lng } = req.query;

            if (!lat || !lng) {
                return next(new ApiError("Latitude and longitude are required for location-based filtering", 400))

            }

            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);

            const maxDistance = 10000
            query = {
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: maxDistance,
                    },
                }
            }
        }
        // if (req.query.rating) {

        // }

        // if (req.query.service) {

        // }

        const studios = await getAll(Studio, query, { ...studioFilter })
        return Success(res, "OK", { studios })
    }
)

module.exports = getAllStudios


