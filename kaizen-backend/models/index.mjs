
import Sequelize  from "sequelize";
// import {User} from "./user.mjs"
// import {Project} from "./project.mjs"
// import {Task} from "./task.mjs"
import dotenv from 'dotenv';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  storage: 'data/dev-db.sqlite3'
});

export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// // Initializes each table
// db.user = User;
// db.project = Project;
// db.task = Task;

// // M:M project and user
// db.project.belongsToMany(db.user, {
//   through: "projectUser",
//   foreignKey: "user_id"
// });
// db.user.belongsToMany(db.project, {
//   through: "projectUser",
//   foreignKey: "project_id"
// });
// // O:M project to task
// db.task.belongsTo(db.project);

// db.project.hasMany(db.task, {
//   as: "tasks"
// });
