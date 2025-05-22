'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "loanBalance", {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("users", "genBalance", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "loanBalance");
    await queryInterface.removeColumn("users", "genBalance");
  }
};