const { User } = require("./users");
const { Transaction } = require("./transactions");

User.hasMany(Transaction, { foreignKey: "userId", as: "transactions" });
Transaction.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Transaction };