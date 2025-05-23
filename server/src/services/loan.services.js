const { User } = require("../data/models/users");
const { Transaction } = require("../data/models/transactions");
const { LoanSave } = require("../data/models/loan-save")
const { Op } = require("sequelize");


exports.requestLoan = async (id, loanData, nin, address) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const loanAmount = parseFloat(loanData.amount);
  const currentLoanBalance = parseFloat(user.loanBalance) || 0;
  const newLoanAmount = parseFloat(loanAmount) || 0;

  user.loanBalance = (currentLoanBalance + newLoanAmount).toFixed(2);
  // user.loanBalance = (parseFloat(user.loanBalance) + loanAmount).toFixed(2);
  user.acctBalance = (parseFloat(user.acctBalance) + loanAmount).toFixed(2);
  user.nin = nin;
  user.address = address;
  
  await user.save();

  await LoanSave.create(loanData); 

  return { message: "Loan credited"};
};


exports.repayLoan = async (id, loanData) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const repaymentAmount = parseFloat(loanData.amount);
  if (parseFloat(user.loanBalance) < repaymentAmount) throw new Error("Incorrect amount");

  user.loanBalance = (parseFloat(user.loanBalance) - repaymentAmount).toFixed(2);
  user.acctBalance = (parseFloat(user.acctBalance) - repaymentAmount).toFixed(2);

  await user.save();

  await LoanSave.create(loanData);

  return { message: "Loan repaid", newBalance: user.acctBalance };
};


exports.autoDeductLoans = async () => {
  const overdueLoans = await LoanSave.findAll({
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
 
   const hasRepaid = await LoanSave.findOne({
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
     user.loanBalance = (parseFloat(user.loanBalance) - parseFloat(loan.amount)).toFixed(2);
     await user.save();
 
     await LoanSave.create({
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
