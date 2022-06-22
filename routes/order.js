const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {veriyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleweares/verifyToken");

router.post("/", veriyToken, orderController.addOrder);
router.put("/:id", verifyTokenAndAdmin, orderController.updateOrder);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getOrderByUserId);
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);
router.get("/income", verifyTokenAndAdmin, orderController.getMonthlyIncome);

module.exports = router;