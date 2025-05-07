const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const pinController = require('../controllers/transactionPin.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/withdraw', auth, transactionController.withdrawal);
router.post('/transfer', auth, transactionController.transfer);
router.post('/transactionPin', auth, pinController);

module.exports = router;