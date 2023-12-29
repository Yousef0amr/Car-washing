const wrap = require('express-async-wrapper');
const Car = require('./../../car.model');
const { Success, ApiError } = require('./../../../../utils/apiResponse');

const removeBrand = wrap(
    async (req, res, next) => {
        const brandData = req.body
        const car = await Car.findById(req.params.id);

        if (!car) {
            return next(new ApiError("car not found", 404));
        }
        const existingBrand = car.brands.find(brand => brand.brandName === brandData.brandName);

        if (!existingBrand) {
            return next(new ApiError("Brand not exists", 400));
        }
        car.brands = car.brands.filter(brand => brand.brandName !== brandData.brandName);

        await car.save();

        return Success(res, "Successfully removed brand", null);
    }
);

module.exports = removeBrand;
