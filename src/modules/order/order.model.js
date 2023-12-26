const mongoose = require('mongoose');
const setting = require('../../config/schemaConfig');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    studio: {
        type: mongoose.Schema.ObjectId,
        ref: "Studio",
        required: true
    },
    services: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Service",
            required: true
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'in-progerss', 'completed'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: new Date.now()
    }
}, setting)


module.exports = mongoose.model('Order', orderSchema)