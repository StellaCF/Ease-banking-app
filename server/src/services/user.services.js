const { User } = require('../data/models/users');

exports.userDetail = async (id) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const { id: userId, firstName, otherName, lastName, email, phoneNumber, acctNumber, acctBalance } = user;

    return { id: userId, firstName, otherName, lastName, email, phoneNumber, acctNumber, acctBalance };
  } catch (error) {
    throw new Error('Error fetching user details: ' + error.message);
  }
}

