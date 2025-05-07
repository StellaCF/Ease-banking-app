const nodemailer = require('nodemailer');
const env = require('../../config/env')


exports.sendEmail = async (emailData) => {

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: env.EMAIL_SENDER,
         pass: env.EMAIL_PASSWORD,
      },
   })

   const options = {
      from: env.EMAIL_SENDER,
      to: emailData.to,
      subject: emailData.title,
      text: emailData.message,
      html: emailData.html
   };

   transporter.sendMail(options, (error, info) => {
      if (error) {
         console.log('Error sending email:', error);
         return false;
      } else {
         console.log('Email sent:', info.response);
         return true;
      }
   });
};