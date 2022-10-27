//'use strict';


const { Sequelize, DataTypes, Model } = require('sequelize');
// Option 1: Passing a connection URI
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize("sequelizedemo", "root", "", {
  host: "127.0.0.1",
  dialect: "sqlite"
})
sequelize.sync()

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


////////////////////////////////////////////////////////////////////////////////////////
  ///Make User Table
    class User extends Model {
      static associate(models) {
        models.User.belongsToMany(Project, {through: 'ProjectToUser'})
      }
    }
    User.init(
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
    );


////////////////////////////////////////////////////////////////////////////////////////
  ///Make Project Table
    class Project extends Model {
      static associate(models) {
        models.Project.belongsToMany(User, {through: 'ProjectToUser'})
        models.Project.hasMany(Task)
      }
    }
    Project.init(
      {
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
    );

////////////////////////////////////////////////////////////////////////////////////////
  ///Make Task Table
    class Task extends Model {
      static associate(models) {
        models.Task.belongsTo(Project)
      }
    }
    Task.init(
{
          task_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
         task_name: DataTypes.STRING,
         task_owner: DataTypes.STRING,
         task_type: DataTypes.STRING,
         task_status: DataTypes.STRING,
         task_descriptions: DataTypes.STRING,
         date_created: DataTypes.DATE,
         date_updated: DataTypes.DATE
        },
        {
          // options
          sequelize,
          modelName: 'Task',
          tableName: 'Task',
          createdAt: 'date_created',
          updatedAt: 'date_updated',
          underscore: true,
        },
      );
  


    /// Project to User map
 




/* BEGIN the MODELS ************* */
// Create methods here for Task, Project, and User

const createUser = async (first_name, last_name, email) => {
        // Call the constructor to create an instance of the model class Exercise
    const new_user = await User.create({
     first_name: first_name,
     last_name: last_name,
     email: email
    });
    return new_user
}

const createProject = async (project_name, project_type, project_owner) => {
    // Call the constructor to create an instance of the model class Exercise
const new_project = await Project.create({
 project_name: project_name,
 project_type: project_type,
 project_owner: project_owner
});
return new_project
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
return new_task
}

const deleteTask = async (task_id) => {
    const deleted_task = await Task.destroy({task_id: task_id})
    console.log(deleted_task)
    return deleted_task
}

const deleteProject = async (project_id) => {
    const deleted_project = await Task.destroy({project_id: project_id})
    console.log(deleted_project)
    return deleted_project
}

const deleteUser = async (user_id) => {
    const deleted_user = await Task.destroy({user_id: user_id})
    console.log(deleted_user)
    return deleted_user
}


module.exports = {deleteUser, deleteProject, deleteTask, createProject, createUser, createTask}