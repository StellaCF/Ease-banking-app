const {  DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

module.exports.User = sequelize.define('users', 
  {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  otherName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [10, 15]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acctNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  acctBalance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  savingsBalance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  loanBalance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genBalance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transactionPin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  otpExpires: {
    type: DataTypes.STRING,
    allowNull: true
  },
  DOB: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    defaultValue: 'client'
  },
}, {
    timestamps: true,
    tableName: 'users',
});
