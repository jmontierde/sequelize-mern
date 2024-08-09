import express from 'express'; 
import dotenv from 'dotenv'; 
import { dbConnection, sequelize } from './config/dbConnect.js';
import Todo from './models/index.js';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes.js'
import cors from 'cors'

const app = express();
dotenv.config({path: './config/config.env'});



app.use(cors({
    origin: 'http://localhost:5173', 
}));




app.use(bodyParser.json());
app.use(express.json());
app.use("/api",  todoRoutes)

Todo.sync({force: false});

sequelize.sync().then(() => { 
    app.listen(process.env.PORT, () => { 
        console.log("Server running on PORT", process.env.PORT);
    });
}).catch(error => console.error('Unable to connect to the database:', error));


export default app;