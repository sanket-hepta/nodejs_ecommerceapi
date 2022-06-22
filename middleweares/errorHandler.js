module.exports = (error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || false;
    const message = error.message;
    const data = error.data;
    const result = error.result || {};
    const validation = error.validation;

    let jsonResponse = {
        status: status,
        message: message,
        data: data,
        errors: validation
    }

    let keys = Object.keys(result)
    keys.map((index) => {
        jsonResponse[index] = result[index];
    });

    response.status(statusCode).json(jsonResponse);
}