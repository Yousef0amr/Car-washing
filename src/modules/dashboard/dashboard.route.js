const express = require('express')
const carRouter = require('./car/car.route')
const serviceRouter = require('./service/service.route')
const dashboardRouter = express.Router()


dashboardRouter.use('/car', carRouter)
dashboardRouter.use('/service', serviceRouter)




module.exports = dashboardRouter