const depositService = require('../services/transaction.services');

exports.withdrawal = async (req, res) => {
   try {
      const { amount } = req.body;
      if (!amount || typeof amount !== 'number' || amount <= 0) {
         return res.status(400).json({ message: 'Invalid deposit amount' });
      }
      const userId = req.user.id;
      const depAmt = await depositService.withdraw(userId, amount)
      res.status(200).json({ message: 'Deposit successful', depAmt });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });  
   }
}

exports.transfer = async (req, res) => {
   try {
      const { amount, accountNum, pin } = req.body;
      if (!amount || typeof amount !== 'number' || amount <= 0) {
         return res.status(400).json({ message: 'Invalid withdrawal amount' });
      }
      if (!pin || pin.length !== 4) {
         return res.status(400).json({ message: 'Complete transaction pin required' });
      }

      const userId = req.user.id;
      const Amt = await depositService.transfer(userId, amount, accountNum)
      res.status(200).json({ message: 'Withdrawal successful', Amt });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });  
   }
}