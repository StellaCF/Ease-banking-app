const { Sequelize } = require('sequelize');
const env = require('./env');

const { DEV_DB_URL, PROD_DB_URL, NODE_ENV } = env;
const connectionString = NODE_ENV === 'production' ? PROD_DB_URL : DEV_DB_URL;

const sequelize = new Sequelize(connectionString, {
   logging: NODE_ENV === 'production' ? false : console.log,
   dialect: 'postgres',
   dialectOptions: 
      NODE_ENV === 'production' ? {
         ssl: {
            require: true,
            rejectUnauthorized: false
         }
      } : undefined,
      pool: {
         max: 10,
         min: 0,
         acquire: 30000,
         idle: 10000
      }
});

module.exports = { sequelize };