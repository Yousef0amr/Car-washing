const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    brand:
    {
        type: String,
        required: true,
        unique: true
    },
    models: [
        {
            type: String,
            required: true
        }
    ],

}, {
    timestamps: true
})

carSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

carSchema.set('toJSON', {
    virtuals: true,
});


module.exports.mongoose.model("Car", carSchema)