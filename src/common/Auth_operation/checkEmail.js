const wrap = require('express-async-wrapper')
const { Success, Error } = require('./../../utils/apiResponse')
const { generateSecret, generateOTP } = require('./../../utils/otpService')
const emailService = require('./../../utils/emailService')
const checkEmailDB = require('./../DB_operation/checkEmailDB')
const generateToken = require('./../../utils/generateToken')

const checkEmail = (Model) => wrap(
    async (req, res) => {
        const { email } = req.body

        const isEmailExist = await checkEmailDB(Model, email)
        if (isEmailExist) {
            return Error(res, "Email is already registered", 400);
        }

        const otpSecret = generateSecret();
        const otp = generateOTP(otpSecret);
        await emailService.sendVerificationEmail(email, otp);

        const token = await generateToken({ otpSecret }, process.env.VERIFICATION_SECRET_TOKEN, "2m")
        return Success(res, 'Check your email for the OTP', { token })
    }
)

module.exports = checkEmail