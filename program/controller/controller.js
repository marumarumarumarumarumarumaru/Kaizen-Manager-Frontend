const Task = require('../models/task.js')
const User = require('../models/user.js')
const Project = require('../models/project.js')

const createProject = async (project_name, project_type, project_owner) => {
    // Call the constructor to create an instance of the model class Exercise
const new_project = await Project.create({
 project_name: project_name,
 project_type: project_type,
 project_owner: project_owner
});
}

const createUser = async (first_name, last_name, email) => {
    const new_user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email
       });
    }

const createTask = async (task_name, task_type, task_owner, task_descriptions, task_status) => {
    // Call the constructor to create an instance of the model class Exercise
const new_task = await Task.create({
 task_name: task_name,
 task_type: task_type,
 task_owner: task_owner,
 task_descriptions: task_descriptions,
 task_status: task_status
});
}

 const deleteTask = async (task_id) => {
    const deleted_task = await Task.destroy({task_id: task_id})
    console.log(deleted_task)
}

const deleteProject = async (project_id) => {
    const deleted_project = await Task.destroy({project_id: project_id})
    console.log(deleted_project)
}

const deleteUser = async (user_id) => {
    const deleted_user = await Task.destroy({user_id: user_id})
    console.log(deleted_user)
}

exports.createProject = createProject;
exports.createTask = createTask;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.deleteTask = deleteTask;
exports.deleteProject = deleteProject;





