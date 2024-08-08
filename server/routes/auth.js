import express from "express";

import { createTodo } from "../services/todos";


const router = express.Router();

router.post("/todos", createTodo);


export default router;
