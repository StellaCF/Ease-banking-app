const express = require("express");
const authController = require("../controllers/auth.controller");
const userSchema = require("../schema/auth.schema");
const validate = require("../middlewares/validator");

const router = express.Router();

router.post("/register", validate(userSchema), authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;