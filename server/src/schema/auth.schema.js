const Joi = require("joi");

const userSchema = Joi.object({
   firstName: Joi.string().min(3).max(30).required(),
   otherName: Joi.string().min(3).max(30).required(),
   lastName: Joi.string().min(3).max(30).required(),
   email: Joi.string().email().required(),
   phoneNumber: Joi.string().max(11).required(),
   password: Joi.string().min(6).max(30).required(),
   confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({ "any.only": "Passwords must match" })
});

module.exports = userSchema;