const Joi = require("joi");
const { Validation } = require('../utils/apiResponse')
const objectId = require('joi-objectid')(Joi)

const validateParamsId = () => {
    return (req, res, next) => {

        const id_schema = Joi.object().required().keys({
            id: objectId(Joi.required())
        });
        const { error, value } = id_schema.validate(req.params || req.query, { abortEarly: false });

        if (error) {
            Validation(res, "Id are required");
        }

        next();
    }
};



module.exports = validateParamsId;