const Cart = require("../models/Cart");

exports.addCart = async (request, response, next) => {
    const newCart = new Cart(request.body);

    try{
        const cart = await newCart.save();
        let customObj = { status: true, statusCode: 201, result : {data: cart}}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.updateCart = async (request, response, next) => {
    try{
        const carttId = request.params.id;
        const updatedCart = await Cart.findByIdAndUpdate(
            carttId,
            {
                $set: request.body
            },
            {
                new: true
            }
        );

        let customObj = { status: true, statusCode: 200, result : {data: updatedCart}}
        next(customObj);
    }catch(error){
        next(error);
    }
}


exports.deleteCart = async (request, response, next) => {
    try{
        const cartId = request.params.id;
        await Cart.findByIdAndDelete(cartId);

        let customObj = {status: true, statusCode: 200, message: "Cart has been deleted!"}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.getCartByUserId = async (request, response, next) => {
    try{
        const cart  = await Cart.findOne({userId: request.params.userId});
        let customObj = { status: true, statusCode: 200, data: cart}
        next(customObj);
    }catch(error){
        next(error)
    }
}

exports.getAllCart = async (request, response, next) => {
    try{
        const carts = await Cart.find();
        let customObj = { status: true, statusCode: 200, data: carts}
        next(customObj);
    }catch(error){
        next(error)
    }
}