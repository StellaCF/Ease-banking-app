const { User } = require("./users");
const { Transaction } = require("./transactions");
const { LoanSave } = require("./loan-save");

User.hasMany(Transaction, { foreignKey: "userId", as: "transactions" });
User.hasMany(LoanSave, { foreignKey: "userId", as: "loan-save" });
Transaction.belongsTo(User, { foreignKey: "userId" });
LoanSave.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Transaction };