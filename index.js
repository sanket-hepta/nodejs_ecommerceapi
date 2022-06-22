const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//-------------------------------Routes------------------------------
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');

//--------------------------Define Middleweares------------------------
const errorHandler = require("./middleweares/errorHandler");

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
        .then(() => {
            console.log("Database connected successfully.");
        })
        .catch((error) => {
            console.log(error);
        });

//-----------------------------App has to use JSON request------------------
app.use(express.json());
app.use(cors());

//-----------------------------Use Router to define endpoint-----------------
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Backend server is running on ${process.env.PORT}`);
})