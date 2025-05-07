const validate = (schema) => async (req, res, next) => {

   try {
     await schema.validateAsync(req.body);
   } catch (err) {
     return res.status(400).json({ error: err.details[0].message });
   }
   next();
 };
 
module.exports = validate;