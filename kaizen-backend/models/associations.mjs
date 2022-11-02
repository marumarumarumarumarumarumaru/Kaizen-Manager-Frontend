import {User} from "./user.mjs"
import {Project} from "./project.mjs"
import {Task} from "./task.mjs"
// Initializes each table

export function createAssociations(){
db.user = User;
db.project = Project;
db.task = Task;
// M:M project and user
db.project.belongsToMany(db.user, {
  through: "projectUser",
  foreignKey: "user_id"
});

db.user.belongsToMany(db.project, {
  through: "projectUser",
  foreignKey: "project_id"
});
// O:M project to task
db.task.belongsTo(db.project);

db.project.hasMany(db.task, {
  as: "tasks"
});
}