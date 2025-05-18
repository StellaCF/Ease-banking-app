const userService = require('../services/user.services');

exports.userDetail = async (req, res) => {
   try {
      const data = await userService.userDetail(req.user.id);
      res.status(200).json({ message: 'User details fetched successfully', data });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
}

exports.updateUser = async (req, res) => {
   try {
      const data = await userService.updateUser(req.user.id, req.body);
      res.status(200).json({ message: 'User updated successfully', data });
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
