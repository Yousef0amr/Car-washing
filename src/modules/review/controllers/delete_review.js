
const wrap = require('express-async-wrapper')
const Review = require('./../review.model')

const { Success, Error } = require('../../../utils/apiResponse')


const deleteReview = wrap(
    async (req, res, next) => {
        const reviewId = req.query.studioId

        const review = await Review.findByIdAndDelete(reviewId)
        if (!review) {
            Error(res, "studio not reviewed")
        }
        review.remove()

        Success(res, "deleted review successfully", null)
    }
)


module.exports = deleteReview