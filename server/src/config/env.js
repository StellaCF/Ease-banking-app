require("dotenv").config();

const dbSettings = {
   PORT: process.env.PORT || 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
   PROD_DB_URL: process.env.PROD_DB_URL || "postgresql://neondb_owner:npg_Jy28klGnfbIR@ep-cool-sunset-a8gs7ewp-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
   DEV_DB_URL: process.env.DEV_DB_URL || "postgres://postgres:740611@localhost:5432/bankApp",

   JWT_SECRET: process.env.JWT_SECRET,

   EMAIL_SENDER: process.env.EMAIL_SENDER,
   EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

module.exports =  dbSettings;