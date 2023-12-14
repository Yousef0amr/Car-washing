const express = require('express');
const addService = require('./controllers/add');
const getAllService = require('./controllers/getAll');
const updateService = require('./controllers/update');
const deleteService = require('./controllers/delete');


const serviceRouter = express.Router();

serviceRouter.route("/add-service")
    .post(addService)

serviceRouter.route("/get-all-services")
    .get(getAllService)

serviceRouter.route("/update-service/:id")
    .put(updateService)

serviceRouter.route("/delete-service/:id")
    .delete(deleteService)






module.exports = serviceRouter