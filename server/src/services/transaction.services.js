const { User } = require('../data/models/users');

exports.withdraw = async (id, amount, pin) => {
   try {
      const user = await User.findOne({ where: {id} });
      if (!user) {
         throw new Error('user not found')
      }

      if (user.transactionPin === null) {
         throw new Error('Transaction pin not set')
      } else if (user.transactionPin !== pin) {
         throw new Error('Invalid transaction pin')
      }

      const newBalance = parseFloat(user.acctBalance) - parseFloat(amount);
      user.acctBalance = newBalance.toFixed(2)
      await user.save()
   } catch (error) {
      throw new Error('Error making deposit:' + error.message)
   }
}

exports.transfer = async (id, amount, accountNum, pin) => {
   try {
      const user = await User.findOne({ where: {id} });
      const receivingUser = await User.findOne({ where: { acctNumber: accountNum } });

      if (!user) {
         throw new Error('user not found')
      }
      if (!receivingUser) {
         throw new Error('Receiving user not found')
      }

      const { firstName, otherName, lastName } = receivingUser;

      if (amount > parseFloat(user.acctBalance)) {
         throw new Error('Insufficient funds')
      }

      if (user.transactionPin === null) {
         throw new Error('Transaction pin not set')
      } else if (user.transactionPin !== pin) {
         throw new Error('Invalid transaction pin')
      }

      const newBalance = parseFloat(user.acctBalance) - parseFloat(amount);
      const receivingUserBalance = parseFloat(receivingUser.acctBalance) + parseFloat(amount);

      user.acctBalance = newBalance.toFixed(2);
      receivingUser.acctBalance = receivingUserBalance.toFixed(2);
      await user.save()
      await receivingUser.save()

      return { firstName, otherName, lastName };
   } catch (error) {
      throw new Error(error.message)
   }
}