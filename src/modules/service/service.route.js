const express = require('express');
const addService = require('./controllers/add_service');
const getAllService = require('./controllers/getAllServices');
const updateService = require('./controllers/update_service');
const deleteService = require('./controllers/delete_service');
const validateService = require('./validators/validator-service');
const validateParamsId = require('../../middlewares/validateParamsId');
const { multerConfig } = require('./../../utils/multer')

const serviceRouter = express.Router();

serviceRouter.route("/")
    .post(multerConfig().fields([
        { name: 'logo', maxCount: 1 }
    ]), validateService(), addService)
    .get(getAllService)

serviceRouter.route("/:id")
    .patch(validateParamsId(), updateService)
    .delete(validateParamsId(), deleteService)


module.exports = serviceRouter