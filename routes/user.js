const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleweares/verifyToken");

router.get("/find/:id", verifyTokenAndAdmin, userController.get);
router.get("/", verifyTokenAndAdmin, userController.getAll);
router.put("/update/:id", verifyTokenAndAuthorization, userController.update);
router.delete("/delete/:id", verifyTokenAndAuthorization, userController.delete);

module.exports = router;