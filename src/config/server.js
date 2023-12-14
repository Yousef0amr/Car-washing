const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { Error } = require('../utils/apiResponse');
const studioRouter = require('../modules/studio/studio.route');
const userRouter = require('../modules/user/user.route');
const adminRouter = require('../modules/admin/admin.route');
const endPoints = require('./../utils/endPoints')
const validateQueryLn = require('./../middlewares/validateQueryLn');
const dashboardRouter = require('../modules/dashboard/dashboard.route');
const app = express();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan')
//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors())
app.use(helmet())
//routes

app.use(endPoints.STUDIO, validateQueryLn(), studioRouter)
app.use(endPoints.USER, validateQueryLn(), userRouter)
app.use(endPoints.ADMIN, validateQueryLn(), adminRouter)


app.use(endPoints.USER, validateQueryLn(), dashboardRouter)
app.use(endPoints.STUDIO, validateQueryLn(), dashboardRouter)



//handle globel errors

app.all("*", (req, res, next) => {
    return Error(res, 'Resourse not found', 404);
});

app.use((error, req, res, next) => {
    return Error(res, error.message, 500)
})


//connect to server
app.listen(PORT, () => {
    try {
        console.log(`Connected To Port ${PORT}`)
    } catch (e) {
        console.log(e)
    }
})