const { Sequelize } = require("sequelize");
const sequelize = require("../Database/config");

const Register = sequelize.define("RegisterUser", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  razorpay_order_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Register;
