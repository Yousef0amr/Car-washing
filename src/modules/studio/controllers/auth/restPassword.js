const restPassword = require('../../../../common/Auth_operation/restPassword')
const Studio = require('./../../studio.model')

module.exports = restPassword(Studio)