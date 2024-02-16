const express = require('express');
const register = require('./controllers/auth/register');
const login = require('./controllers/auth/login');
const checkEmail = require('./controllers/auth/checkEmail');
const verifyEmail = require('../../common/Auth_operation/verifyEmail');
const validateRequest = require('../../middlewares/validateRequest');
const loginSchema = require('./../../common/validationsModel/login-schema')
const verifyEmailSchema = require('./../../common/validationsModel/verifyEmail-schema')
const checkEmailSchema = require('./../../common/validationsModel/checkEmail-schema');
const validatorRegister = require('./validators/validator-register');
const forgetPassword = require('./controllers/auth/forgetPassword');
const { multerConfig } = require('./../../utils/multer');
const restPassword = require('./controllers/auth/restPassword');
const resendCode = require('../../common/Auth_operation/resendCode');
const restPasswordSchema = require('../../common/validationsModel/restPassword');
const getStudio = require('./controllers/get_studio');
const getStudiosByService = require('./controllers/getStudiosByService');
const getPopularStudios = require('./controllers/getPopularStudios');
const validateParamsId = require('../../middlewares/validateParamsId');

const studioRouter = express.Router();

studioRouter.route('/register')
    .post(multerConfig().fields([
        { name: 'logo', maxCount: 1 },
        { name: 'studio_images' }
    ]), validatorRegister(), register);

studioRouter.route('/login')
    .post(multerConfig().array(), validateRequest(loginSchema), login);

studioRouter.route('/check-email')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), checkEmail);

studioRouter.route('/verify-email')
    .post(multerConfig().array(), validateRequest(verifyEmailSchema), verifyEmail);

studioRouter.route('/forget-password')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), forgetPassword);

studioRouter.route('/reset-password')
    .post(multerConfig().array(), validateRequest(restPasswordSchema), restPassword);

studioRouter.route('/resend-code')
    .post(multerConfig().array(), validateRequest(checkEmailSchema), resendCode);


studioRouter.route('/get-studios/:id')
    .get(getStudiosByService)

studioRouter.route('/current-studio')
    // .patch( updateStudio)
    .get(getStudio)

studioRouter.route('/popular-studios')
    .get(getPopularStudios)


// studioRouter.route('/:id')
//     .get(getStudio)
// // .delete(deleteStudio)


module.exports = studioRouter;
