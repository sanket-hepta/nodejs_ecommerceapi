const User = require("../models/User");
const CryptoJs = require("crypto-js");

exports.get = async (request, response, next) => {
    try{
        const user = await User.findById(request.params.id);
        const {password, __v, ...data} = user._doc;
        let customObj = { status: true, statusCode: 200, data: data}
        next(customObj);
    }catch(error){
        next(error)
    }
}

exports.getAll = async (request, response, next) => {
    try{
        const users = await User.find();
        let customObj = { status: true, statusCode: 200, data: users}
        next(customObj);
    }catch(error){
        next(error)
    }
}

exports.update = async (request, response, next) => {
    try{
        
        const userId = request.params.id;
        let body = request.body;
        if(request.body.password){
            body.password = await CryptoJs.AES.encrypt(request.body.password, process.env.SECRET_PASSPHRASE);
        }

        let user = await User.findByIdAndUpdate({ _id: userId }, body, {new: true});

        console.log(user);

        const {password, __v, ...data} = user._doc;
        let customObj = {status: true, statusCode: 200, result : {data: data}}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.delete = async (request, response, next) => {
    try{
        
        const userId = request.params.id;
        await User.findByIdAndDelete({ _id: userId });
        let customObj = {status: true, statusCode: 200, message: "User has been deleted!"}
        next(customObj);
    }catch(error){
        next(error);
    }
}