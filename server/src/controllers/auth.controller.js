const authService = require('../services/auth.services');
const env = require('../config/env')
const bcrypt = require('bcrypt');
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/email/email');

// Register a new user
exports.register = async (req, res) => {
   try {
      const { firstName, otherName, lastName, email, phoneNumber, password } = req.body;

      const acctNumber = phoneNumber.slice(1);

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = await authService.createUser({
         firstName,
         otherName,
         lastName,
         email,
         phoneNumber,
         password: hashedPassword,
         acctNumber: acctNumber,
         acctBalance: 0,
         savingsBalance: 0,
      });

      return res.status(201).json({ message: 'User registered successfully', data });
   } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ message: 'Server error', error: error.message });
   }
};

// login controller
exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      

      const user = await authService.loginUser({ email, password});
      
      const token = jwt.sign({ email: user.email, id: user.id, acctNumber: user.acctNumber }, env.JWT_SECRET, {
         expiresIn: '10h',
      });

      return res.status(200).json({ message: 'Login successful', token });

   } catch (error) {
      if (
         error.message.includes('User not found') ||
         error.message.includes('Invalid password')
      ) {
         return res.status(401).json({ message: error.message });
      }

      res.status(500).json({ message: 'Server error', error: error.message });
   }
};


// Forgot password
exports.forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;
      
      const otp = randomInt(100000, 999999).toString();
      const otpExpiration = new Date(Date.now() + 11 * 60 * 1000).toISOString();

      await authService.forgotPassword(email, otp, otpExpiration);

      // Send OTP to user's email 
      const emailData = {
         title: "Your One-Time Password (OTP)",
         subject: "Your OTP Code for Secure Access",
         to: email,
         message:
         `Dear User,\n\nYour one-time password (OTP) for verification is: ${otp}\n\n` +
         `This code is valid till ${otpExpiration}. Do not share it with anyone.`
      };   
      await sendEmail(emailData);

      res.status(200).json({ message: 'OTP sent to your email' });
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
};

//reset password
exports.resetPassword = async (req, res) => {
   try {
      const { email, otp, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const resetUser = await authService.resetPassword(email, otp, hashedPassword);

      if (resetUser) {
         res.status(200).json({ message: 'Password reset successful' });
      } else {
         res.status(400).json({ message: 'Invalid OTP or OTP expired' });
      }
   } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
   }
}