const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader?.startsWith("Bearer") && authHeader.split(' ')[1];
 
   if (!token) return res.status(401).json({ message: 'Authentication required. Please log in to access this resource.' });

   const secret = env.JWT_SECRET;

   jwt.verify(token, secret, (err, user) => {
     if (err) return res.status(403).json({ message: 'Your session has expired. Please log in again.' });
 
     req.user = user;
     next();
   });
};

module.exports = authenticateToken;