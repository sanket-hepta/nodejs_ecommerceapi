const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const {veriyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleweares/verifyToken");

router.post("/", veriyToken, cartController.addCart);
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
router.get("/:userId", verifyTokenAndAuthorization, cartController.getCartByUserId);
router.get("/", verifyTokenAndAdmin, cartController.getAllCart);

module.exports = router;