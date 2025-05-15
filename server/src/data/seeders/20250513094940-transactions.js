'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.bulkInsert('transactions', [
      {
        id: 'd3e52cfd-3471-4157-ab7e-cb363e9903ba',
        userId: '0be8df0a-d97a-4a08-83e8-20f2efdbafef',
        type: 'loan',
        amount: 1000.00,
        acctName: null,
        bankAcct: null,
        acctNumber: null,
        status: 'processing',
        description: 'Loan Credited'
      },
      {
        id: '03a37a85-516b-4b8c-a51f-248c2fb86fa9',
        userId: '0be8df0a-d97a-4a08-83e8-20f2efdbafef',
        type: 'transfer',
        amount: 1000.00,
        acctName: 'stella okafor',
        bankAcct: 'EaseBank',
        acctNumber: '8077662711',
        status: 'processing',
        description: 'test'
      },
      {
        id: 'b9ea02cc-3735-4869-95b9-8d5274907f34',
        userId: '0be8df0a-d97a-4a08-83e8-20f2efdbafef',
        type: 'withdraw',
        amount: 1000.00,
        acctName: 'stella okafor',
        bankAcct: 'zenith',
        acctNumber: '226647902',
        status: 'processing',
        description: ''
      },
      {
        id: 'd3a03440-18cf-4710-a673-63ecf4db766c',
        userId: '10523e39-29d6-47b4-90c6-8f9745fa282a',
        type: 'deposit',
        amount: 20000.00,
        acctName: null,
        bankAcct: null,
        acctNumber: null,
        status: 'processing',
        description: ''
      },
      {
        id: '01e9da58-6a63-49d1-aa43-107d2069de27',
        userId: '10523e39-29d6-47b4-90c6-8f9745fa282a',
        type: 'loan',
        amount: 10000.00,
        acctName: null,
        bankAcct: null,
        acctNumber: null,
        status: 'processing',
        description: 'Loan Credited'
      },
      {
        id: 'fbb609f3-00f8-4e27-a1f2-dec09230eb60',
        userId: '3783a3fd-3397-4bd7-a186-fb09daa3e92b',
        type: 'repayment',
        amount: 1000.00,
        acctName: null,
        bankAcct: null,
        acctNumber: null,
        status: 'processing',
        description: 'Loan repayment'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('transactions', null, {});

  }
};
