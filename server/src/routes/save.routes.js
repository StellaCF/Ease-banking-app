const express = require('express');
const saveController = require('../controllers/save.controller');
const auth = require('../middlewares/auth');
const validate = require("../middlewares/validator");
const { saveSchema } = require('../schema/transaction.schema')

const router = express.Router();

router.post('/save', auth, validate(saveSchema), saveController.saveFunds);
router.post('/spend', auth, saveController.useSavings);
router.patch('/update-save', auth, saveController.addSavings);
router.get('/user-savings', auth, saveController.userSavings)

module.exports = router;