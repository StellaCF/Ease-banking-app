const { User } = require('../data/models/association');

exports.userDetail = async (id) => {
  try {
    const user = await User.findOne({ where: { id },
      include: ["transactions"]
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { id: userId, firstName, otherName, lastName, email, phoneNumber, acctNumber, acctBalance, transactions } = user;

    return { id: userId, firstName, otherName, lastName, email, phoneNumber, acctNumber, acctBalance, transactions };
  } catch (error) {
    throw new Error('Error fetching user details: ' + error.message);
  }
}

