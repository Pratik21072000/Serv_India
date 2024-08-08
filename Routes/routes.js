const express = require("express");
const router = express.Router();
const loginController = require("../Controllers/loginController");
const paymentController = require("../Controllers/razorpayController");

router.post("/registerUser", loginController.registerUser);
router.post("/loginUser", loginController.loginUser);
router.post(
  "/createOrder",
  loginController.authenticateToken,
  paymentController.createOrder
);
router.post(
  "/paymentSuccess",
  loginController.authenticateToken,
  paymentController.paymentSuccess
);

module.exports = router;
