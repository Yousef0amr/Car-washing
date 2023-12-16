const express = require('express')
const carRouter = require('./car/car.route')
const serviceRouter = require('./service/service.route')
const dashboardRouter = express.Router()


dashboardRouter.use('/cars', carRouter)
dashboardRouter.use('/services', serviceRouter)




module.exports = dashboardRouter