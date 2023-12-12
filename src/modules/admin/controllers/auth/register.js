const wrap = require('express-async-wrapper')
const { Success, Error } = require('./../../../../utils/apiResponse')
const Admin = require('./../../admin.model')
const hashPassword = require("./../../../../utils/hashPassword")
const generateToken = require('./../../../../utils/generateToken')
const CryptoJS = require("crypto-js");
const cloudinary = require('./../../../../config/cloudinary')
const { v4: uuidv4 } = require('uuid');

const register = wrap(
    async (req, res, next) => {
        const value = { ...req.body }
        const files = req.files

        const isAdminExist = await Admin.findOne({ email: value.email })
        if (isAdminExist) {
            return Error(res, "Email is already registered");
        }

        const logo = await cloudinary.uploader.upload(files.logo[0].path, {
            folder: `carWashing/studio/logo`,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })

        value.logo = `${logo.version}/${logo.public_id}`
        value.password = await hashPassword(value.password)
        value.phone = CryptoJS.AES.encrypt(value.phone, process.env.ENCRYPTION_PHONE_KEY).toString()

        const admin = new Admin({
            ...value
        });
        await admin.save();

        const payload = { id: admin._id, role: admin.role };
        const accessToken = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET);

        return Success(res, "OK", { accessToken }, 201);
    }
)

module.exports = register