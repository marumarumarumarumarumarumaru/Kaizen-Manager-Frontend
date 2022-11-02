
import Sequelize  from "sequelize";
import {sequelize}  from "./db_init.mjs";
import {User} from "./user.mjs"
import {Project} from "./project.mjs"
import {Task} from "./task.mjs"
import dotenv from 'dotenv';
import {createAssociations} from "./associations.mjs"



export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.project = Project;
db.task = Task;

createAssociations(db)

db.sequelize.sync().then(()=> {
  console.log("syncing db")
});