const express = require('express');
const loanController = require("../controllers/loan.controller")
// const pinController = require('../controllers/transactionPin.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post("/loan", auth, loanController.requestLoan);
router.post("/repay-loan", auth, loanController.repayLoan);

module.exports = router;