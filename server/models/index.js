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
    allowNull: false, 
  }, 
  description: { 
    type: DataTypes.STRING,
    allowNull: false, 
  },
  status: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: { 
    type: DataTypes.DATE,
  }
}, { 
  freezeTableName: true
});

export default Todo;
