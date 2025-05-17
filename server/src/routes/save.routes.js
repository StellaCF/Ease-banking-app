const express = require('express');
const saveController = require('../controllers/save.controller');
const auth = require('../middlewares/auth');
const validate = require("../middlewares/validator");
const { saveSchema } = require('../schema/transaction.schema')

const router = express.Router();

router.post('/save', auth, validate(saveSchema), saveController.saveFunds);
router.post('/spend/:id', auth, saveController.useSavings);
router.patch('/save/:id/update', auth, saveController.addSavings);
router.get('/user-savings', auth, saveController.userSavings)

module.exports = router;