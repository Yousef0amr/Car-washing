const wrap = require('express-async-wrapper')
// const { Success, Error } = require('./../../../utils/apiResponse')
// const User = require('./../../user.model')

// const CryptoJS = require("crypto-js");


const getUser = wrap(
    async (req, res, next) => {
        const id = req.query.id;


    }
)


module.exports = getUser


