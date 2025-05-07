// const auth = require('../services/user.services');
const userService = require('../services/user.services');

exports.userDetail = async (req, res) => {
   try {
      const user = await userService.userDetail(req.user.id);
      res.status(200).json({ message: 'User details fetched successfully', user });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
}
