const wrap = require('express-async-wrapper')
const { Success, Error } = require('./../../../utils/apiResponse')
const User = require('./../user.model')
const { userFilter } = require('./../../../utils/filters')


const getUser = wrap(
    async (req, res, next) => {
        const id = req.userId || req.params.id
        const user = await User.findById(id, { userFilter })
        Success(res, "Ok", { user })
    }
)


module.exports = getUser


