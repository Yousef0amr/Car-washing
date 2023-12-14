
const Success = (res, message = "OK", results, statusCode = 200) => {
    return res.status(statusCode).json({
        message,
        results
    });
};


const Error = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
        message
    });
};


const Validation = (res, errors) => {
    return res.status(422).json({
        errors
    });
};



module.exports = {
    Success,
    Error,
    Validation
}




