const wrap = require('express-async-wrapper')
const { Success, Error, Validation } = require('../../utils/apiResponse')
const { verifyOTP } = require('../../utils/otpService')


const verifyEmail = wrap(
    async (req, res, next) => {
        const value = { ...req.body }

        const isValid = verifyOTP(value.token, value.otpSecret);

        if (isValid) {
            return Success(res, 'Email verified successfully')
        } else {
            return Error(res, 'OTP is Expired', 401)
        }
    }
)

module.exports = verifyEmail