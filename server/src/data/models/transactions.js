const {  DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

module.exports.Transaction = sequelize.define("transactions", 
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: DataTypes.ENUM('deposit', 'withdraw', 'transfer'),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      acctName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bankAcct: {
        type: DataTypes.STRING,
        allowNull: true
      },
      acctNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'completed'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'transactions',
      timestamps: true
    }
  );


