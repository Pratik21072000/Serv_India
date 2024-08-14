const { Sequelize } = require("sequelize");
const sequelize = require("../Database/config");

const Register = sequelize.define("RegisterUser", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountType: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
  userName: {
    type: Sequelize.JSONB,
    allowNull: false,
    unique: true,
  },
  userEmail: {
    type: Sequelize.JSONB,
    allowNull: false,
    unique: true,
  },
  userPassword: {
    type: Sequelize.JSONB,
    allowNull: false,
  },
});

module.exports = Register;
