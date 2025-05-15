'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'nin', {
      type: Sequelize.STRING,
      allowNull: true 
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'nin');
  }
  
};
