const User = require("../models/User");
const CryptoJs = require("crypto-js");
const validationHandler = require("../validations/validationHandler");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

exports.register = async (request, response, next) => {
    try{

        validationHandler(request);

        let user = new User({
            username: request.body.username,
            email: request.body.email,
            password: await CryptoJs.AES.encrypt(request.body.password, process.env.SECRET_PASSPHRASE)
        });

        //----------------------------Save the details in User Collection--------------------
        user = await user.save();
        const {password, __v, ...data} = user._doc;

        let customObj = { status: true, statusCode: 201, result : {data: data}}
        next(customObj);
    }catch(error){
        next(error);
    }
};

exports.login = async (request, response, next) => {
    try{
        const username = request.body.username;
        
        const user = await User.findOne({ username: username });
        if(!user){
            let error = new Error("Invalid Username or Password");
            error.status = false;
            error.statusCode = 403;
            throw error;
        }

        const hashedPassword = await CryptoJs.AES.decrypt(user.password, process.env.SECRET_PASSPHRASE);
        const password_str = hashedPassword.toString(CryptoJs.enc.Utf8);

        if(password_str !== request.body.password){
            let error = new Error("Invalid Username or Password");
            error.status = false;
            error.statusCode = 401;
            throw error;
        }

        const {password, __v, ...data} = user._doc;
        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, config.jwtSecret);
        let customObj = {status: true, statusCode: 200, result : {data: data, token: token}}
        next(customObj);
    }catch(error){
        next(error);
    }
};