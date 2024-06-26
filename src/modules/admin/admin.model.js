const mongoose = require('mongoose')
const CryptoJS = require("crypto-js");
const setting = require('./../../config/schemaConfig')

const adminSchema = new mongoose.Schema({
    logo: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
},
    setting
);



module.exports = mongoose.model("Admin", adminSchema)






