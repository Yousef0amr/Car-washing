const wrap = require('express-async-wrapper')
const generateToken = require('./../../utils/generateToken')
const { Success, Error } = require('./../../utils/apiResponse')
const verifyPassword = require('./../../utils/verifyPassword')

const login = (Model) => wrap(
    async (req, res, next) => {
        const value = req.body
        const user = await Model.findOne({ email: value.email });
        if (!user) {
            return Error(res, "Invalid password or email");
        }

        const isValid = await verifyPassword(value.password, user.password);
        if (!isValid) {
            return Error(res, "Invalid password or email");
        }

        user.isLoggedIn = true;
        await user.save()

        const payload = { id: user._id, role: user.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, { token });
    }
)


module.exports = login