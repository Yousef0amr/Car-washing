const { globalFilter } = require('./../../../utils/filters')

const create = (Model, value) => {
    const model = new Model({ ...value }, { ...globalFilter })
    return model.save();
}

module.exports = create





