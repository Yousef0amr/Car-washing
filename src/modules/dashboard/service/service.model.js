const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})


serviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model("Service", serviceSchema)