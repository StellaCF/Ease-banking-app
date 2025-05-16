const { User } = require('../data/models/association');

exports.userDetail = async (id) => {
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


    return user;
  } catch (error) {
    throw new Error('Error fetching user details: ' + error.message);
  }
};

