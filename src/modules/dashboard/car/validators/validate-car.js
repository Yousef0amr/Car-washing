const Joi = require("joi");
const handleFieldErrors = require('./../../../../utils/handleFileErrors');
const { Validation } = require("./../../../../utils/apiResponse");
const errorValidationMessages = require('./../../../../utils/errorValidationMessages')
const fileSchema = require('./../../../../common/validationsModel/file-schema')
const validatorCar = () => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.files }

        const schema = Joi.object({
            logo: fileSchema.required(),
            type: Joi.string().required(),
            brands: Joi.array().items(
                Joi.object({
                    brandName: Joi.string().required(),
                    models: Joi.array().items(
                        Joi.object({
                            name: Joi.string().required(),
                        })
                    ),
                })
            ),
        });

        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorResponse = handleFieldErrors(error, errorValidationMessages?.[req.ln]);
            Validation(res, errorResponse)
        }

        next()
    }
};


module.exports = validatorCar;