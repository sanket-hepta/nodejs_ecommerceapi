const jwt = require("jsonwebtoken");
const config = require("../config/index");

const veriyToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, config.jwtSecret, (error, user) => {
            if(error){
                let customObj = { status: false, statusCode: 403, message: "Token is not valid!"}
                next(customObj);
            }
            
            request.user = user;
            next();
        });
    }else{
        let customObj = { status: false, statusCode: 401, message: "You are not authenticated!"}
        next(customObj);
    }
};

const verifyTokenAndAuthorization = (request, response, next) => {
    veriyToken(request, response, () => {
        if(request.user.id === request.params.id || request.user.isAdmin){
            next();
        }else{
            let customObj = { status: false, statusCode: 403, message: "You are not allowed to perform this action!"}
            next(customObj);
        }
    });
}

const verifyTokenAndAdmin = (request, response, next) => {
    veriyToken(request, response, () => {
        if(request.user.isAdmin){
            next();
        }else{
            let customObj = { status: false, statusCode: 403, message: "You are not allowed to perform this action!"}
            next(customObj);
        }
    });
}

module.exports = {veriyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};