const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;


const endPoints = require('./../utils/endPoints')
const { ApiError } = require('../utils/apiResponse');

const globelError = require('../middlewares/errorMiddleware');
const validateQueryLn = require('./../middlewares/validateQueryLn');


const studioRouter = require('../modules/studio/studio.route');
const userRouter = require('../modules/user/user.route');
const adminRouter = require('../modules/admin/admin.route');
const carRouter = require('../modules/car/car.route');
const serviceRouter = require('../modules/service/service.route');
const orderRouter = require('../modules/order/order.route');


//middlewares
app.use(express.json());
app.use(cors())
app.use(helmet())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use(endPoints.STUDIO, validateQueryLn(), studioRouter)
app.use(endPoints.USER, validateQueryLn(), userRouter)
app.use(endPoints.ADMIN, validateQueryLn(), adminRouter)
app.use(endPoints.CAR, validateQueryLn(), carRouter)
app.use(endPoints.SERVICE, validateQueryLn(), serviceRouter)
app.use(endPoints.ORDER, validateQueryLn(), orderRouter)


app.all("*", (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404))
});

app.use(globelError)


//connect to server
const server = app.listen(PORT, () => {

    try {
        console.log(`Connected To Port ${PORT}`)

    } catch (e) {
        console.log(e)
    }
})


//handle unhandledRejection outside express

process.on("unhandledRejection", (err) => {
    console.error(`Database error ${err}`);
    server.close(() => {
        console.error(`Shutting down`);
        process.exit(1)
    })
})

