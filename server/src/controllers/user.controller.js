const userService = require('../services/user.services');

exports.userDetail = async (req, res) => {
   try {
      const data = await userService.userDetail(req.user.id);
      return res.status(200).json({ message: 'User details fetched successfully', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
   }
}

exports.updateUser = async (req, res) => {
   try {
      const data = await userService.updateUser(req.user.id, req.body);
      return res.status(200).json({ message: 'User updated successfully', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
   }
}


exports.userTransaction = async (req, res) => {
   try {
      const data = await userService.userTransactions(req.user.id);
      return res.status(200).json({ message: 'User transactions fetched successfully', data });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
   }
}

exports.deleteAcct = async (req, res) => {
   try {
      const data = await userService.deleteAcct(req.user.id);
      return res.status(200).json({ message: 'User deleted' });
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
   }
}
