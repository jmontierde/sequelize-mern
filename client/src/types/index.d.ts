export type Todo = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    status: boolean; 
  }
  

interface TodoStore { 
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    createTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: number) => void;

}