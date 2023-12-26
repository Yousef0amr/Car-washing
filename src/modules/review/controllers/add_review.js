const wrap = require('express-async-wrapper')
const create = require('./../../../common/DB_operation/CRUD/create')
const Review = require('./../review.model')
const { Success, Error } = require('../../../utils/apiResponse')
const addReview = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const studioId = req.query.studioId
        const userId = req.userId

        const isReviewed = await Review.findOne({ studio: studioId, user: userId })
        if (isReviewed) {
            Error(res, "studio already reviewed")
        }
        value.studio = studioId;
        value.user = userId
        const review = await create(Review, value)

        Success(res, "added review successfully", { review })
    }
)


module.exports = addReview