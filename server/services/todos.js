import axios from "axios";
import Todo from "../models";

export const createTodo = async(res, req) => { 

    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json(error)
    }
}