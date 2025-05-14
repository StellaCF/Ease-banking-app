const pinService = require('../services/transactionPin.services');

const setPin = async (req, res) => {
   try {
      const { id } = req.user;
      const { pin } = req.body;
   
      if (!pin) {
         return res.status(400).json({ message: 'Pin is required' });
      }
   
      if (pin.length !== 4) {
         return res.status(400).json({ message: 'Pin must be 4 digits' });
      }
   
      await pinService.createTransactionPin({id, pin});
      return res.status(200).json({ message: 'Transaction pin set successfully' });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

module.exports = setPin;