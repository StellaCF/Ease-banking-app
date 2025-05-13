'use strict';
const { hashSync } = require('bcrypt');

const hashPassword = (password) => hashSync(password, 10);

module.exports = {
  async up (queryInterface) {

      await queryInterface.bulkInsert('users', [
         {
          firstName: 'Rose',
          otherName: 'Ella',
          lastName: 'Okafor',
          email: "stellachommy01@gmail.com",
          phoneNumber: "08105740611",
          password: hashPassword("ella1002"),
          acctNumber: "8105740611",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        },
        {
          firstName: 'John',
          otherName: 'Doe',
          lastName: 'Smith',
          email: "johndoe@gmail.com",
          phoneNumber: "08077662711",
          password: hashPassword("password123"),
          acctNumber: "8077662711",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        },
        {
          firstName: "John",
          otherName: "Michael",
          lastName: "Doe",
          phoneNumber: "08123456789",
          email: "johnmike01@example.com",
          password: hashPassword("securePass456"),
          acctNumber: "8123456789",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        },
        {
          firstName: "John",
          otherName: "Doe",
          lastName: "Benson",
          phoneNumber: "07011223344",
          email: "adaebere22@example.com",
          password: hashPassword("mySecret789"),
          acctNumber: "7011223344",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        },
        {
          firstName: "Jane",
          otherName: "Ruth",
          lastName: "Michael",
          phoneNumber: "08033445566",
          email: "jane.okeke@example.com",
          password: hashPassword("securePass123"),
          acctNumber: "8033445566",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        },
        {
          firstName: "Michael",
          otherName: "Tunde",
          lastName: "Johnson",
          phoneNumber: "08122334455",
          email: "michael.tunde@example.com",
          password: hashPassword("passWord456!"),
          acctNumber: "8122334455",
          acctBalance: "0",
          savingsBalance: "0",
          transactionPin: "1002"
        }
    ]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
    
  }
};
