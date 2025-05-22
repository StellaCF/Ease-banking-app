const { User } = require('../data/models/association');
const bcrypt = require("bcrypt");

exports.userDetail = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error('Error fetching user details: ' + error.message);
  }
};


exports.updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await user.update(data);

    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};



exports.userTransactions = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          association: "transactions",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
        {
          association: "loanSave",
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { transactions, loanSave } = user

    return { transactions, loanSave};
  } catch (error) {
    throw new Error('Error fetching user transactions: ' + error.message);
  }
};


exports.deleteAcct = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
    return { message: 'Account deleted successfully' };

  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};