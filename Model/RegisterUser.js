const { Sequelize } = require("sequelize");
const sequelize = require("../Database/config");

const Register = sequelize.define("RegisterUser", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Register;
