const wrap = require('express-async-wrapper')
const Service = require('../service.model')
const { Success } = require('../../../utils/apiResponse')

const deleteService = wrap(
    async (req, res, next) => {
        const id = req.params.id

        await Service.findByIdAndDelete(id);

        return Success(res, "service deleted successfully")
    }
)


module.exports = deleteService