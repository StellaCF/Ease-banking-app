'use strict';
const { sequelize } = require('../../config/db');

/** @type {require('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.createTable('users', {
      id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      allowNull: false,
      primaryKey: true,
      },
      firstName: {
      type: Sequelize.STRING,
      allowNull: false
      },
      otherName: {
      type: Sequelize.STRING,
      allowNull: false
      },
      lastName: {
      type: Sequelize.STRING,
      allowNull: false
      },
      email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      },
      address: {
      type: Sequelize.STRING,
      allowNull: true
      },
      phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
      },
      password: {
      type: Sequelize.STRING,
      allowNull: false
      },
      acctNumber: {
      type: Sequelize.STRING(10),
      allowNull: false,
      },
      acctBalance: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      savingsBalance: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transactionPin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      otp: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      otpExpires: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
      type: Sequelize.ENUM('admin', 'client'),
      defaultValue: 'client'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};