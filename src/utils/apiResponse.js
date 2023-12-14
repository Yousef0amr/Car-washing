
exports.Success = (res, message = "OK", results, statusCode = 200) => {
    return res.status(statusCode).json({
        message,
        results
    });
};


exports.Error = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
        message
    });
};


exports.Validation = (res, errors) => {
    return res.status(422).json({
        errors
    });
};




