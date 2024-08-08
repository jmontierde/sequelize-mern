import express from 'express'; 
import dotenv from 'dotenv'; 
import { dbConnection, sequelize } from './config/dbConnect.js';
import Todo from './models/index.js';
import auth from './routes/auth.js'

const app = express();

app.use(express.json());




// app.post('/api/todos', async(req, res) => { 
//     try {
//         const todo = await Todo.create(req.body);
//         res.json(todo)
//     } catch (error) {
//         res.json(error)
//     }
// })

dotenv.config({path: './config/config.env'});

Todo.sync({force: false});

sequelize.sync().then(() => { 
    app.listen(process.env.PORT, () => { 
        console.log("Server running on PORT", process.env.PORT);
    });
}).catch(error => console.error('Unable to connect to the database:', error));
