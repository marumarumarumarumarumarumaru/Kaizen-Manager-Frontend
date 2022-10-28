const sequelize = require("../config/db.config.js");
const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) =>{
  User = sequelize.define('User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   first_name: DataTypes.STRING,
   last_name: DataTypes.STRING,
   email: DataTypes.STRING,
   date_created: DataTypes.DATE,
   date_updated: DataTypes.DATE
  },
  {
    // options
    sequelize,
    modelName: 'User',
    tableName: 'User',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscore: true,
  },
  )
  return User
}
