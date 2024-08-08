import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('todo-sequelize', 'root', '', { 
    host: 'localhost',
    port: 3306,
    dialect: "mysql"
});

export const dbConnection = async () => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
