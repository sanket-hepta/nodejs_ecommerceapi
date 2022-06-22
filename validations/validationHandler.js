const { validationResult }  = require("express-validator");

module.exports = (request) => {
    const validationErrors = validationResult(request);
    if(!validationErrors.isEmpty()){
        const error = new Error('Validation Failed');
        error.statusCode =  422;
        error.validation = validationErrors.array();
        throw error;
    }
}