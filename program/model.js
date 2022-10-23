//'use strict';

const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'mysql',
    storage: 'path/to/database.sqlite'
  });

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


////////////////////////////////////////////////////////////////////////////////////////
  ///Make User Table
  const { Model } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
        models.User.hasMany(UserToProject)
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
    return User;
  };


////////////////////////////////////////////////////////////////////////////////////////
  ///Make Project Table
  module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
      static associate(models) {
        models.Project.hasMany(UserToProject)
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
    return Project;
  };

////////////////////////////////////////////////////////////////////////////////////////
  ///Make Task Table
  module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
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
      return Task;
    };
  


    /// Project to User map
  module.exports = (sequelize, DataTypes) => {
    class UserToProject extends Model {
      static associate(models) {
        models.UserToProject.belongsTo(User)
        models.UserToProject.belongsTo(Project)
      }
    }
    UserToProject.init(
      {
    
      },
      {
        // options
        sequelize,
        modelName: 'UserToProject',
        tableName: 'UserToProject',
        createdAt: 'date_created',
        updatedAt: 'date_updated',
        underscore: true,
      },
    );
    return UserToProject;
  };





/* BEGIN the MODELS ************* */

const createExercise = async (name, reps, weight, unit, date) => {
        // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({
        name: name, 
        reps: reps, 
        weight: weight, 
        unit: unit, 
        date: date
    });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}



// FIND by ID
const findExerciseById = async (id) => {
    const query = Exercise.findById(id);
    return query.exec();
}


//Delete the exercise with provided id value
//@returns A promise. Resolves to the count of deleted documents
const deleteById = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

