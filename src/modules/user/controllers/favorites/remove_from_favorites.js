const wrap = require('express-async-wrapper')
const User = require('./../../user.model')
const Studio = require('./../../../studio/studio.model')
const { ApiError, Success } = require('./../../../../utils/apiResponse')
const removeFromFavorites = wrap(
    async (req, res, next) => {
        const id = req.params.id;
        const studio = await Studio.findById(id);
        if (!studio) {
            return next(new ApiError("Studio not founded", 404))
        }
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { favorites: id } },
            { new: true }
        ).populate('favorites');;
        if (!user) {
            return next(new ApiError("Studio not found in favorites", 404))
        }
        return Success(res, "Removed from favorites successfully", { favorites: user.favorites })
    }
)



module.exports = removeFromFavorites