import express from 'express';

import { createTodo, deleteTodo, fetchTodos, updateTodos, updateTodoStatus } from '../services/todos.js';
const router = express.Router();

router.post('/todo', createTodo)
router.get('/todos', fetchTodos);
router.put('/todos/:id', updateTodos);
router.patch('/todos/status/:id', updateTodoStatus);
router.delete('/todos/:id', deleteTodo);


export default router;