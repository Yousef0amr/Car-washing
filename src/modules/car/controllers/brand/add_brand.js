const wrap = require('express-async-wrapper');
const Car = require('./../../car.model');
const { Success, ApiError } = require('./../../../../utils/apiResponse');

const addBrand = wrap(async (req, res, next) => {
    const carId = req.params.id;
    const brandData = req.body;

    const car = await Car.findById(carId);

    if (!car) {
        return next(new ApiError("Car not found", 404));
    }

    const existingBrand = car.brands.find(brand => brand.brandName === brandData.brandName);

    if (existingBrand) {
        return next(new ApiError("Brand with the same name already exists", 400));
    }

    car.brands.push({ ...brandData, models: [] });
    const updatedCar = await car.save();
    return Success(res, "Successfully added brand", { car: updatedCar });

});

module.exports = addBrand;
