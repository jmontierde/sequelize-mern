import Todo from "../models/index.js";

export const createTodo = async( req, res) => { 
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const fetchTodos = async(req, res) => { 
    try {
        const todos = await Todo.findAll()
         res.status(201).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateTodos = async(req, res) => { 
    try {
        const [updated] = await Todo.update(req.body, { 
            where: {id: req.params.id}
        })

        if (updated) {
            const todo = await Todo.findByPk(req.params.id);
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
        


    } catch (error) {
        
    }
}

export const deleteTodo = async(req, res) => { 
    try {
        const deleted = await Todo.destroy({where: {id: req.params.id} })

        

        if (deleted) {
            res.status(204).json({message: 'Deleted Successfully'})
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}