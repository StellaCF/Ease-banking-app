const { User } = require("../data/models/users");
const { Transaction } = require("../data/models/transactions");
const { Op } = require("sequelize");
const cron = require('node-cron')


exports.requestLoan = async (id, loanData) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const loanAmount = parseFloat(loanData.amount);
  user.acctBalance = (parseFloat(user.acctBalance) + loanAmount).toFixed(2);

  await user.save();

  await Transaction.create(loanData); 

  return { message: "Loan credited", newBalance: user.acctBalance };
};


exports.repayLoan = async (id, loanData) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const repaymentAmount = parseFloat(loanData.amount);
  if (parseFloat(user.acctBalance) < repaymentAmount) throw new Error("Insufficient balance to repay loan");

  user.acctBalance = (parseFloat(user.acctBalance) - repaymentAmount).toFixed(2);

  await user.save();

  await Transaction.create(loanData);

  return { message: "Loan repaid", newBalance: user.acctBalance };
};


exports.autoDeductLoans = async () => {
  const overdueLoans = await Transaction.findAll({
    where: {
      type: 'loan',
      createdAt: { [Op.lte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  });

  for (const loan of overdueLoans) {
   if (!loan.createdAt || isNaN(new Date(loan.createdAt))) {
    console.log("Skipping loan due to invalid createdAt:", loan.id);
   continue;}
 
   const user = await User.findOne({ where: { id: loan.userId } });
   if (!user) {   
     console.log("No user found for loan:", loan.id, "userId:", loan.userId);
   continue;}
 
   const hasRepaid = await Transaction.findOne({
     where: {
       userId: loan.userId,
       type: 'repayment',
       amount: loan.amount,
       createdAt: { [Op.gte]: loan.createdAt }
     }
   });

   if (hasRepaid) {
    console.log("Loan already repaid:", loan.id);
    continue;
  }
 
   if (parseFloat(user.acctBalance) >= parseFloat(loan.amount)) {
     user.acctBalance = (parseFloat(user.acctBalance) - parseFloat(loan.amount)).toFixed(2);
     await user.save();
 
     await Transaction.create({
       userId: user.id,
       amount: loan.amount,
       type: "repayment",
       description: "Auto deduction for unpaid loan",
       createdAt: new Date()
     });

     console.log("Auto-deducted loan for user:", user.id);
   } else {
    console.log("Insufficient balance for user:", user.id);
   }
 }
 

  return { message: "Auto deductions processed" };
};
