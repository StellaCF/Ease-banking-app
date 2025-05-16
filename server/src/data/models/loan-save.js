const {  DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

module.exports.LoanSave = sequelize.define("loan-save", 
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
        type: DataTypes.ENUM('loan', 'repayment', 'save', 'spend'),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'approved'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'loan-save',
      timestamps: true
    }
  );


