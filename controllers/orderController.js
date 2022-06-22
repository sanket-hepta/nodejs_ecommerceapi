const Order = require("../models/Order");

exports.addOrder = async (request, response, next) => {
    const newOrder = new Order(request.body);

    try{
        const order = await newOrder.save();
        let customObj = { status: true, statusCode: 201, result : {data: order}}
        next(customObj);
    }catch(error){
        next(error);
    }
}

exports.updateOrder = async (request, response, next) => {
    try{
        const orderId = request.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: request.body
            },
            {
                new: true
            }
        );

        let customObj = { status: true, statusCode: 200, result : {data: updatedOrder}}
        next(customObj);
    }catch(error){
        next(error);
    }
}


exports.deleteOrder = async (request, response, next) => {
    try{
        const orderId = request.params.id;
        await Order.findByIdAndDelete(orderId);

        let customObj = {status: true, statusCode: 200, message: "Order has been deleted!"}
        next(customObj);
    }catch(error){
        next(error);
    }
}

//Get User Orders
exports.getOrderByUserId = async (request, response, next) => {
    try{
        const orders  = await Order.find({userId: request.params.userId});
        let customObj = { status: true, statusCode: 200, data: orders}
        next(customObj);
    }catch(error){
        next(error)
    }
}

//Get All
exports.getAllOrders = async (request, response, next) => {
    try{
        const orders = await Orders.find();
        let customObj = { status: true, statusCode: 200, data: orders}
        next(customObj);
    }catch(error){
        next(error)
    }
}

exports.getMonthlyIncome = async (request, response, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                  month: { $month: "$createdAt" },
                  sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ]);

        let customObj = { status: true, statusCode: 200, result: {income: income}}
        next(customObj);
    }catch(error){
        next(error)
    }
}