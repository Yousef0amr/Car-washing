const wrap = require('express-async-wrapper');
const Car = require('./../../car.model');
const { Success, ApiError } = require('./../../../../utils/apiResponse');

const removeModel = wrap(
    async (req, res, next) => {
        const brandData = req.body
        const car = await Car.findById(req.params.id);

        if (!car) {
            return next(new ApiError("car not found", 404));
        }
        const existingBrand = car.brands.find(brand => brand.brandName === brandData.brandName);

        if (!existingBrand) {
            return next(new ApiError("Brand not found", 404));
        }

        const existingModel = existingBrand.models.find(model => model.name === brandData.modelName);

        if (!existingModel) {
            return next(new ApiError("Model not found", 404));
        }

        existingBrand.models = existingBrand.models.filter(model => model.name !== brandData.modelName);
        await car.save();
        return Success(res, "Successfully deleted model", null);
    }
);

module.exports = removeModel;
