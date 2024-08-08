// config/razorpay.js

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "your_razorpay_key_id",
  key_secret: "your_razorpay_key_secret",
});

module.exports = razorpay;
