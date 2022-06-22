const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.createPayment = async (request, response, next) => {
    try{
        stripe.charges.create(
            {
                source: request.body.tokenId,
                amount: request.body.amount,
                currency: "inr"
            },
            (stripeError, stripeResponse) => {
                if(stripeError){
                    let error = new Error(stripeError);
                    error.status = false;
                    error.statusCode = 500;
                    throw error;
                }else{
                    let customObj = { status: true, statusCode: 200, data: stripeResponse}
                    next(customObj);
                }
            }    
        );
    }catch(error){
        next(error);
    }
};