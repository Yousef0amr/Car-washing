const wrap = require('express-async-wrapper')
const Car = require('./../../car.model')
const { Success } = require('./../../../../../utils/apiResponse')
const create = require('./../../../../../common/DB_operation/CRUD/create')
const cloudinary = require('./../../../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');
const addCar = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/car/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })

        value.logo = `${logo.version}/${logo.public_id}`
        const car = await create(Car, value)

        return Success(res, "successfully added car", { car })
    }
)


module.exports = addCar