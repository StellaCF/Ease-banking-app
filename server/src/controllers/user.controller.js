// const auth = require('../services/user.services');
const userService = require('../services/user.services');

exports.userDetail = async (req, res) => {
   try {
      const data = await userService.userDetail(req.user.id);
      res.status(200).json({ message: 'User details fetched successfully', data });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
}


exports.userTransaction = async (req, res) => {
   try {
      const data = await userService.userTransactions(req.user.id);
      res.status(200).json({ message: 'User transactions fetched successfully', data });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
}
