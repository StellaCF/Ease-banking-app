const { User } = require('../data/models/users');
const bcrypt = require('bcrypt')

exports.createTransactionPin = async ({id, pin}) => {
   try {
      const user = await User.findOne({ where: {id} });
      if (!user) {
         throw new Error('user not found')
      }
      const hashedPin = await bcrypt.hash(pin, 10);
      user.transactionPin = hashedPin;
      await user.save()
   } catch (error) {
      throw new Error('Error creating transaction pin:' + error.message)
   }
}