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
        res.json(error)
    }
}



export const updateTodoStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const [updated] = await Todo.update({ status }, {
        where: { id: req.params.id }
      });
  
      if (updated) {
        const todo = await Todo.findByPk(req.params.id);
        res.json(todo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  



export const deleteTodo = async(req, res) => { 
    try {
        const id = req.params.id;
        const deleted = await Todo.destroy({ where: { id } });
        
        if (deleted) {
            res.status(204).send(); // Successfully deleted, no content
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}