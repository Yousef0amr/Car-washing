const Joi = require("joi");
const handleFieldErrors = require('./../../../utils/handleFileErrors');
const { Validation } = require("../../../utils/apiResponse");
const errorValidationMessages = require('./../../../utils/errorValidationMessages')
const fileSchema = require('./../../../common/validationsModel/file-schema')
const validatorRegister = () => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.files }

        const schema = Joi.object({
            logo: fileSchema.max(1).required(),
            name: Joi.string().min(3).required(),
            phone: Joi.string().min(10).max(11).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            openTime: Joi.string().required(),
            closeTime: Joi.string().required(),
            services: Joi.array().items(Joi.object({ service: Joi.string().required(), price: Joi.string().required() })).single().required(),
            studio_images: fileSchema.required()
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            return Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validatorRegister;
