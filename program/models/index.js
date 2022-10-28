
const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  storage: 'data/dev-db.sqlite3'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initializes each table
db.user = require("./user.js")(sequelize, Sequelize);
db.project = require("./project.js")(sequelize, Sequelize);
db.task = require("./task.js")(sequelize, Sequelize);

// M:M dates and icons
db.project.belongsToMany(db.user, {
  through: "projectUser",
  foreignKey: "user_id"
});
db.user.belongsToMany(db.project, {
  through: "projectUser",
  foreignKey: "project_id"
});
// O:M dates and events
db.task.belongsTo(db.project);

db.project.hasMany(db.task, {
  as: "tasks"
});


module.exports = db;