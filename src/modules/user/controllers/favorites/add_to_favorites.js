const wrap = require('express-async-wrapper')
const User = require('./../../user.model')

const addToFavorites = wrap(
    async (req, res, next) => {
        const id = req.query.id;
        const user = await User.findOneAndUpdate(
            { _id: req.userId, 'favorites': { $nin: id } },
            { $addToSet: { favorites: id } },
            { new: true }
        );

        if (!user) {
            return Error(res, "Studio already in favorites")
        }
        Success(res, "Added to favorites successfully", { favorites: user.favorites })
    }
)



module.exports = addToFavorites