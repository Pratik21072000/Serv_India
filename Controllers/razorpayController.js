const RegisterUser = require("../Model/RegisterUser");

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
  };

  try {
    const response = await razorpay.orders.create(options);
    const order = await RegisterUser.create({
      amount: amount,
      currency: currency,
      razorpay_order_id: response.id,
    });

    res.json({ orderId: order.id, razorpayData: response });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.paymentSuccess = async (req, res) => {
  const { orderId, paymentId } = req.body;

  try {
    const order = await RegisterUser.findByPk(orderId);
    order.paymentId = paymentId;
    await order.save();

    res.json({ message: "Payment success" });
  } catch (error) {
    console.error("Error marking payment success:", error);
    res.status(500).json({ error: "Failed to mark payment success" });
  }
};
