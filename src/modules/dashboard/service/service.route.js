const express = require('express');
const addService = require('./controllers/add_service');
const getAllService = require('./controllers/getAllServices');
const updateService = require('./controllers/update_service');
const deleteService = require('./controllers/delete_service');


const serviceRouter = express.Router();

serviceRouter.route("/")
    .post(addService)
    .get(getAllService)

serviceRouter.route("/:id")
    .put(updateService)
    .delete(deleteService)


module.exports = serviceRouter