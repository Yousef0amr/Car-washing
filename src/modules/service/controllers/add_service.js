const wrap = require('express-async-wrapper')
const Service = require('../service.model')
const { Success } = require('../../../utils/apiResponse')
const create = require('../../../common/DB_operation/CRUD/create')
const cloudinary = require('./../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');
const addService = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files


        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/services/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })

        value.logo = `${logo.public_id}`
        const service = await create(Service, value)

        return Success(res, { service })
    }
)


module.exports = addService