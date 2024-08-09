import { create } from 'zustand'
import { TodoStore } from '../types';




export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    createTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    updateTodo: (updatedTodo) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        ),
    })),
    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
  }))
  
