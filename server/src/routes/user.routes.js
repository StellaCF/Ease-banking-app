const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/user", auth, userController.userDetail);
router.get("/user-transactions", auth, userController.userTransaction);
router.put("/user", auth, userController.updateUser);
router.delete("/delete-acct", auth, userController.deleteAcct);

module.exports = router;