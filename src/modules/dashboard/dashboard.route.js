const express = require('express')
const carPropertiesRouter = require('./car_properties/car_properties.route')
const serviceRouter = require('./service/service.route')
const dashboardRouter = express.Router()


dashboardRouter.use('/car-properties', carPropertiesRouter)
dashboardRouter.use('/service', serviceRouter)




module.exports = dashboardRouter