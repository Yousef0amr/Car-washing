const mongoose = require('mongoose');

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
        required: true
    },
    models: [modelSchema]
});

const carSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    brands: [brandSchema]
}, {
    timestamps: true
});

carSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

carSchema.set('toJSON', {
    virtuals: true,
});


module.exports = mongoose.model('Car', carSchema);
