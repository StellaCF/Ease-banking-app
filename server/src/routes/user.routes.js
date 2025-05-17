const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/user", auth, userController.userDetail);
router.get("/user-transactions", auth, userController.userTransaction);

module.exports = router;