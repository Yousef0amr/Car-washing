const checkUserDB = async (Model, id) => {
    return await Model.findById(id)
}

module.exports = checkUserDB