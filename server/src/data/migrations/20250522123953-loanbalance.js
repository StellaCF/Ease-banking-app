'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "loanBalance", {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("users", "genBalance", {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "loanBalance");
    await queryInterface.removeColumn("users", "genBalance");
  }
};
