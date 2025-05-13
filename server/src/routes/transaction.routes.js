const express = require('express');
const transactionController = require('../controllers/transaction.controller');
const pinController = require('../controllers/transactionPin.controller');
const auth = require('../middlewares/auth');
const validate = require("../middlewares/validator");
const { depositSchema, withdrawSchema, transferSchema} = require("../schema/transaction.schema")

const router = express.Router();

router.route('/deposit')
   .post(auth, validate(depositSchema), transactionController.deposit)
   .all((req, res) => {
      res
         .status(405)
         .json({message: `${req.method} method not allowed`});
   });
router.post('/withdraw', auth, validate(withdrawSchema), transactionController.withdrawal);
router.post('/transfer', auth, validate(transferSchema), transactionController.transfer);
router.post('/verify-account', transactionController.accountVerification)
router.post('/transactionPin', auth, pinController);

module.exports = router;