const { User } = require('../data/models/users');

exports.createTransactionPin = async (id, pin) => {
   try {
      const user = await User.findOne({ where: {id} });
      if (!user) {
         throw new Error('user not found')
      }
      user.transactionPin = pin;
      await user.save()
   } catch (error) {
      throw new Error('Error creating transaction pin:' + error.message)
   }
}