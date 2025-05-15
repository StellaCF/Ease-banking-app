const { User } = require('../data/models/users');
const { Transaction } = require('../data/models/transactions');
const bcrypt = require('bcrypt');

exports.deposit = async (id, depositData) => {
   try {
      const user = await User.findByPk(id);
      if (!user) {
         throw new Error('user not found')
      }

      await Transaction.create(depositData)
      const newBalance = parseFloat(user.acctBalance) + parseFloat(depositData.amount);
      user.acctBalance = newBalance.toFixed(2)
      await user.save()
   } catch (error) {
      throw new Error('Error making deposit:' + error.message)
   }
}

exports.withdraw = async (id, withData, pin) => {
   try {
      const user = await User.findByPk(id);
      if (!user) {
         throw new Error('user not found')
      }

      const validPin = await bcypt.compare(pin, user.transactionPin);

      if (Number(user.acctBalance) < Number(withData.amount)) {
         throw new Error('Insufficient Balance')
      } else if (user.transactionPin === null) {
         throw new Error('Transaction pin not set')
      } else if (!validPin) {
         throw new Error('Invalid transaction pin')
      }

      await Transaction.create(withData)
      const newBalance = parseFloat(user.acctBalance) - parseFloat(withData.amount);
      user.acctBalance = newBalance.toFixed(2)
      await user.save()
   } catch (error) {
      throw new Error('Error making withdrawal:' + error.message)
   }
}

exports.verifyAcct = async (acctNumber) => {
   const verifiedAcct = await User.findOne({ where: { acctNumber } })
   if (!verifiedAcct) {
      throw new Error("Account not found")
   }
   const { firstName, otherName, lastName } = verifiedAcct;
   
   return { firstName, otherName, lastName, acctNumber, bank: "EaseBank" };
}

exports.transfer = async (id, transferData, pin) => {
   try {
      const user = await User.findByPk(id);
      const receivingUser = await User.findOne({ where: { acctNumber: transferData.acctNumber } });

      if (!user) {
         throw new Error('user not found')
      }
      if (!receivingUser) {
         throw new Error('Account not found')
      }

      const { firstName, otherName, lastName, acctNumber } = receivingUser;

      if (transferData.amount > parseFloat(user.acctBalance)) {
         throw new Error('Insufficient funds')
      }

      const validPin = await bcrypt.compare(pin, user.transactionPin);
      if (user.transactionPin === null) {
         throw new Error('Transaction pin not set')
      } else if (!validPin) {
         throw new Error('Invalid transaction pin')
      }

      const newBalance = parseFloat(user.acctBalance) - parseFloat(transferData.amount);
      const receivingUserBalance = parseFloat(receivingUser.acctBalance) + parseFloat(transferData.amount);

     await Transaction.create(transferData);

      user.acctBalance = newBalance.toFixed(2);
      receivingUser.acctBalance = receivingUserBalance.toFixed(2);
      await user.save()
      await receivingUser.save()

      return { firstName, otherName, lastName, acctNumber };
   } catch (error) {
      throw new Error(error.message);
   }
}