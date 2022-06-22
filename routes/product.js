const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {verifyTokenAndAdmin} = require("../middleweares/verifyToken");

router.post("/", verifyTokenAndAdmin, productController.addProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/:id", productController.getProduct);
router.get("/", productController.getAllProducts);

module.exports = router;