const Product = require("../models/Product");
const validationHandler = require("../validations/validationHandler");

exports.addProduct = async (request, response, next) => {
    const newProduct = new Product(request.body);

    try{
        validationHandler(request);
        const product = await newProduct.save();
        let customObj = { status: true, statusCode: 201, result : {data: product}}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.updateProduct = async (request, response, next) => {
    try{
        const produdctId = request.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(
            produdctId,
            {
                $set: request.body
            },
            {
                new: true
            }
        );

        let customObj = { status: true, statusCode: 200, result : {data: updatedProduct}}
        next(customObj);
    }catch(error){
        next(error);
    }
}


exports.deleteProduct = async (request, response, next) => {
    try{
        const produdctId = request.params.id;
        await Product.findByIdAndDelete(produdctId);

        let customObj = {status: true, statusCode: 200, message: "Product has been deleted!"}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.getProduct = async (request, response, next) => {
    try{
        const product = await Product.findById(request.params.id);
        const {password, __v, ...data} = product._doc;
        let customObj = { status: true, statusCode: 200, data: data}
        next(customObj);
    }catch(error){
        next(error)
    }
}

exports.getAllProducts = async (request, response, next) => {

    const qNew = request.query.new;
    const qCategory = request.query.category;

    try{

        let products;
        if(qNew && !qCategory){
            products = await Product.find()
                                    .sort({createdAt: -1})
                                    .limit(5);
        }else if(!qNew && qCategory){
            products = await Product.find({
                                        categories: {
                                            $in: [qCategory]
                                        }
                                    });
        }else if(qNew && qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
            .sort({createdAt: -1})
            .limit(5);
        }else{
            products = await Product.find();
        }
        let customObj = { status: true, statusCode: 200, data: products}
        next(customObj);
    }catch(error){
        next(error)
    }
}