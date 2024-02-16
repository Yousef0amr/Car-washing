const mongoose = require('mongoose');

const setting = require('./../../config/schemaConfig')
const userSchema = new mongoose.Schema({
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
    vehicleType: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    carPlate: {
        type: String,
        required: true,
    },
    carColor: {
        type: String,
        required: true,
    },
    car_images: [
        {
            type: String,
            default: ""
        }
    ],
    favorites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Studio"
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }
    ],
    role: {
        type: String,
        default: "user"
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, setting);


module.exports = mongoose.model('User', userSchema);








