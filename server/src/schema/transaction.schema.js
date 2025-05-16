const Joi = require("joi");

exports.depositSchema = Joi.object({
   amount: Joi.number().required(),
   description: Joi.string(),
});

exports.withdrawSchema = Joi.object({
   amount: Joi.number().required(),
   description: Joi.string(),
   pin: Joi.string().required(),
   acctName: Joi.string().required(),
   acctNum: Joi.string().required(),
   bank: Joi.string().required(),
});

exports.transferSchema = Joi.object({
   amount: Joi.number().required(),
   description: Joi.string(),
   pin: Joi.string().required(),
   acctName: Joi.string().required(),
   acctNum: Joi.string().required(),
});

exports.saveSchema = Joi.object({
   amount: Joi.number().required(),
   description: Joi.string().required(),
});
