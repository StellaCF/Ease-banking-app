const { UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

const { User } = require("../data/models/users");

exports.createUser = async ( userData ) => {
  try {
     await User.create( userData);
     return true;
  } catch (error) {

    if (error instanceof UniqueConstraintError) {
      throw new Error("Email already exists");
    }

    throw new Error("Error creating user: " + error.message);
  }
}

exports.loginUser = async ({email, password}) => {
   try {
     const user = await User.findOne({ where: { email } });
     if (!user) {
       throw new Error("User not found");
     }
     
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
       throw new Error("Invalid password");
     }
 
     return user;
   } catch (error) {
     throw new Error("Error during login: " + error.message);
   }
 };


exports.forgotPassword = async (email, otp, otpExpiration) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Not a registered user");
    }
    user.otp = otp;
    user.otpExpires = otpExpiration;
    await user.save();  

    return user;
  } catch (error) {
    throw new Error("Error during password reset: " + error.message);
  }
}

exports.resetPassword = async (email, otp, newPassword) => {
  try {
    const user = await User.findOne({ where: { email } });

    const now = new Date();
    const otpExpiration = new Date(user.otpExpires);
    console.log("Current time:", now);
    console.log("OTP expires:", otpExpiration);
    console.log("Is OTP expired?", otpExpiration <= now);

    if (String(otp) === String(user.otp) && otpExpiration > now) {
      user.password = newPassword;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return true;
    }

  } catch (error) {
    throw new Error("Error during password reset: " + error.message); 
  }
}