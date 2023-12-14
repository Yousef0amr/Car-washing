const { globalFilter } = require('./../../../utils/filters')

const getAll = (Model) => {
    return Model.find({}, { ...globalFilter })
}

module.exports = getAll