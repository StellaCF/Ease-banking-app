const loanService = require("../services/loan.services");
const cron = require('node-cron');

exports.requestLoan = async (req, res) => {
  try {
    const { amount, address, nin } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid loan amount" });
    }

    const loanData = {
      userId: userId,
      amount: amount,
      description: "Loan Credited",
      type: "loan",
      createdAt: new Date()
    }

    const result = await loanService.requestLoan(userId, loanData, nin, address);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.repayLoan = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid repayment amount" });
    }

    const loanData = {
      userId,
      amount,
      type: "loan",
      description: "Loan repayment",
      status: "paid",
      createdAt: new Date()
    }

    const data = await loanService.repayLoan(userId, loanData);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


cron.schedule('0 0 * * *', async () => {
   try {
     const result = await loanService.autoDeductLoans();
     console.log("Auto loan deduction completed:", result);
   } catch (error) {
     console.error("Auto loan deduction failed:", error.message);
   }
 });
