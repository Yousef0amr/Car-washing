const wrap = require('express-async-wrapper')
const { Success, ApiError } = require('./../../../../utils/apiResponse')
const Studio = require('./../../studio.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const transformLocation = require('./../../../../utils/tranformLocation')

const cloudinary = require('./../../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');
const checkEmailDB = require('../../../../common/DB_operation/checkEmailDB')


const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        const isStudioExist = await checkEmailDB(Studio, value.email)
        if (isStudioExist) {
            return next(new ApiError("Email is already registered", 400));
        }

        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/studio/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })
        const images = await Promise.all(files.studio_images.map(async file => {
            const image = await cloudinary.uploader.upload(file.path, {
                folder: `carWashing/studio/studio_images`,
                public_id: uuidv4(),
                use_filename: true,
                unique_filename: true,
                resource_type: "auto"
            });

            return `${image.public_id}`;
        }));


        value.logo = `${logo.public_id}`
        value.studio_images = images
        value.password = await hashPassword(value.password)

        value.location = transformLocation(value.location)

        const studio = new Studio({
            ...value
        });
        await studio.save();

        const payload = { id: studio.id, role: studio.role };
        const token = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, "OK", { token }, 201);
    }
)



module.exports = register