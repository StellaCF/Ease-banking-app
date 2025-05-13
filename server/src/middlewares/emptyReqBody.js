module.exports = (req, res, next) => {
   if (
     req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH'
   ) {
     if (!req.body || Object.keys(req.body).length === 0) {
       return res
         .status(400)
         .json({ message: "Request body cannot be empty. Please provide the required data" });
     }
   }
   next();
 };