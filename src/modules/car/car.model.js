const mongoose = require('mongoose');
const setting = require('../../config/schemaConfig')


const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    models: [modelSchema]
}, {
    _id: false
});

const carSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },
    brands: [brandSchema]
}, setting);



module.exports = mongoose.model('Car', carSchema);
