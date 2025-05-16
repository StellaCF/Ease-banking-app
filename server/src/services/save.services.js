const { User } = require("../data/models/users");
const { LoanSave } = require("../data/models/loanSave");

exports.saveFunds = async (userId, saveData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const saveAmount = parseFloat(saveData.amount);
  const acctBalance = parseFloat(user.acctBalance);

  if (saveAmount <= 0) throw new Error("Invalid amount");
  if (acctBalance < saveAmount) throw new Error("Insufficient account balance");

  user.acctBalance = (acctBalance - saveAmount).toFixed(2);
  user.savingsBalance = (parseFloat(user.savingsBalance) + saveAmount).toFixed(2);

  await user.save();

  const result = await LoanSave.create(saveData);
  console.log(result)

  return {
    message: "Funds saved successfully",
    saveId: result.Id,
    newAcctBalance: user.acctBalance,
    newSaveBalance: user.savingsBalance
  };
};


exports.updateSave = async (userId, transactionId, amount) => {
   const user = await User.findByPk(userId);
   if (!user) throw new Error("User not found");

   const saving = await LoanSave.findOne({
      where: {
         id: transactionId,
         userId,
         type: 'save'
      }
   });

   if (!saving) throw new Error("Saving entry not found");

   const newAmount = parseFloat(amount);

   saving.amount = (parseFloat(saving.amount) + newAmount).toFixed(2);
   user.savingsBalance = (parseFloat(user.savingsBalance) + newAmount).toFixed(2);

   await saving.save();
   await user.save();
}


exports.useSavings = async (userId, LoanSaveId, amount) => {
   const user = await User.findByPk(userId);
   if (!user) throw new Error("User not found");
 
   const saving = await LoanSave.findOne({
     where: {
       id: transactionId,
       userId,
       type: 'save'
     }
   });
 
   if (!saving) throw new Error("Saving entry not found");
   
   const withdrawAmount = parseFloat(amount);
   const savingAmount = parseFloat(saving.amount);
   const saveBalance = parseFloat(user.savingsBalance);
 
   if (withdrawAmount <= 0) throw new Error("Invalid amount");
   if (withdrawAmount > savingAmount) throw new Error("Insufficient amount in this saving entry");
   if (withdrawAmount > saveBalance) throw new Error("Insufficient total save balance");
 

   user.acctBalance = (parseFloat(user.acctBalance) + withdrawAmount).toFixed(2);
   user.savingsBalance = (saveBalance - withdrawAmount).toFixed(2);
   await user.save();
 

   if (withdrawAmount === savingAmount) {
     await saving.destroy();
   } else {
     saving.amount = (savingAmount - withdrawAmount).toFixed(2);
     await saving.save();
   }
 
   return {
     message: "Savings used successfully",
     newAcctBalance: user.acctBalance,
     remainingSaveBalance: user.savingsBalance
   };
 };
 


exports.userSavings = async (userId) => {
  try {
    const savings = await LoanSave.findAll({ where: {
      userId,
      type: 'save'
    }
    });

    return savings;
  } catch (error) {
    throw new Error('Error fetching savings: ' + error.message);
  }
}