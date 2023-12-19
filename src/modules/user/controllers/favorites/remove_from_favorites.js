const wrap = require('express-async-wrapper')
const User = require('./../../user.model')
const { Error, Success } = require('./../../../../utils/apiResponse')
const removeFromFavorites = wrap(
    async (req, res, next) => {
        const id = req.query.id;

        const user = await userModel.findByIdAndUpdate(
            req.userId,
            { $pull: { favorites: id } },
            { new: true }
        );

        if (!user) {
            return Error(res, "Studio not found in favorites")
        }
        Success(res, "Removed from favorites successfully", null)
    }
)



module.exports = removeFromFavorites