const { User } = require("./users");
const { Transaction } = require("./transactions");
const { LoanSave } = require("./loanSave");

User.hasMany(Transaction, { foreignKey: "userId", as: "transactions" });
User.hasMany(LoanSave, { foreignKey: "userId", as: "loanSave" });
Transaction.belongsTo(User, { foreignKey: "userId" });
LoanSave.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Transaction };