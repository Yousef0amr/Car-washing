const wrap = require('express-async-wrapper')
const Review = require('./../review.model')

const { Success, Error } = require('../../../utils/apiResponse')


const updateReview = wrap(
    async (req, res, next) => {
        const reviewId = req.query.studioId
        const value = { ...req.body }
        const review = await Review.findByIdAndUpdate(reviewId, { ...value })
        if (!review) {
            Error(res, "studio not reviewed")
        }
        review.save()

        Success(res, "updated review successfully", null)
    }
)


module.exports = updateReview