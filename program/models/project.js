
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
const Project = sequelize.define('Project', {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   project_name: DataTypes.STRING,
   project_owner: DataTypes.STRING,
   project_type: DataTypes.STRING,
   date_created: DataTypes.DATE,
   date_updated: DataTypes.DATE
  },
  {
    // options
    sequelize,
    modelName: 'Project',
    tableName: 'Project',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscore: true,
  },
)
return Project
}
