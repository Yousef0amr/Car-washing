const Joi = require("joi");
const handleFieldErrors = require('./../utils/handleFileErrors')
const { Validation } = require('./../utils/apiResponse')

const validateQueryLn = () => {
    return (req, res, next) => {

        const ln_schema = Joi.object().required().keys({
            ln: Joi.string().valid('en', 'ar').required()
        });
        const { error, value } = ln_schema.validate(req.query, { abortEarly: false });

        if (error) {
            Validation(res, "ln are required");
        }
        req.ln = value.ln
        next();
    }
};



module.exports = validateQueryLn;