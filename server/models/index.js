import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from '../config/dbConnect.js';

const Todo = sequelize.define('Todo', { 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true
  }, 
  title: { 
    type: DataTypes.STRING,
  }, 
  description: { 
    type: DataTypes.STRING
  },
  status: { 
    type: DataTypes.BOOLEAN
  },
  createdAt: { 
    type: DataTypes.DATE
  }
}, { 
  freezeTableName: true
});

export default Todo;
