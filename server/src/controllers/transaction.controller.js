const transactionService = require('../services/transaction.services');

exports.deposit = async (req, res) => {
   try {
      const { amount } = req.body;

      if (!req.body || Object.keys(req.body).length === 0) {
         return res.status(400).json({ message: "Request body cannot be empty. Please amount" });
      } else if (!amount) {
         return res.status(422).json({ message: 'Unprocessable content. amount required' });
      } else if (amount <= 0) {
         return res.status(400).json({ message: 'Invalid deposit amount' });
      } else if (typeof amount !== 'number') {
         return res.status(400).json({ message: 'Invalid data format. "amount" must be a number.' });
      }
      const userId = req.user.id;
      const depositData = {
         userId: userId,
         amount: amount,
         type: "deposit"
      }
      const data = await transactionService.deposit(userId, depositData)
      return res.status(200).json({ message: 'Deposit successful', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });  
   }
}

exports.withdrawal = async (req, res) => {
   try {
      const { amount, pin, acctName, acctNum, bank, description } = req.body;

      if (!req.body || Object.keys(req.body).length === 0) {
         return res.status(400).json({ message: "Request body cannot be empty. Please amount" });
      } else  if (amount <= 0) {
         return res.status(400).json({ message: 'Invalid withdrawal amount' });
      } 

      const userId = req.user.id;
      const withData = {
         userId: userId, 
         amount: amount, 
         acctName: acctName, 
         acctNumber: acctNum, 
         bankAcct: bank, 
         description: description,
         type: "withdraw"
      }
      const data = await transactionService.withdraw(userId, withData, pin)
      return res.status(200).json({ message: 'Withdrawal successful', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });  
   }
}

exports.accountVerification = async (req, res) => {
   try {
      const { acctNum } = req.body;
      const data = await transactionService.verifyAcct(acctNum);
      return res.status(200).json({ message: 'user fetched', data });
   } catch (error) {
      return res.status(401).json({ message: error.message})
   }
}

exports.transfer = async (req, res) => {
   try {
      const { amount, acctNum, acctName, pin, description } = req.body;
      if (amount <= 0) {
         return res.status(400).json({ message: 'Invalid amount' });
      }  
      if (!pin) {
         return res.status(400).json({ message: 'Transaction pin required' });
      }
      const userId = req.user.id;
      const transferData = {
         userId: userId, 
         amount: amount, 
         description: description,
         acctName: acctName, 
         acctNumber: acctNum, 
         bankAcct: "EaseBank", 
         type: "transfer"
      }

      const data = await transactionService.transfer(userId, transferData, pin)
      return res.status(200).json({ message: 'Transfer successful', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });  
   }
}