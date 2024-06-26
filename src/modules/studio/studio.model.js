const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");
const setting = require('./../../config/schemaConfig');

const studioSchema = new mongoose.Schema({
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
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    openTime: {
        type: String,
        required: true,
    },
    closeTime: {
        type: String,
        required: true,
    },
    services: [
        new mongoose.Schema({
            price: {
                type: String,
                required: true,
            },
            service: {
                type: mongoose.Types.ObjectId,
                ref: "Service"
            }
        }, { _id: false })
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }
    ],
    studio_images: [
        {
            type: String,
            default: ""
        }
    ],
    ratingsAvg: {
        type: Number,
        default: 0
    },
    ratingsQuentity: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "studio"
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, setting
);


studioSchema.pre(['find', 'findOne'], function (next) {
    this.populate('services.service', { createdAt: false });
    next();
});



module.exports = mongoose.model('Studio', studioSchema);








