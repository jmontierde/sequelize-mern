
import axios from 'axios';
import { Todo } from '../types';





const api = axios.create({
    baseURL: 'http://localhost:3000/api',
  });
  

export const fetchTodos = async(): Promise<Todo[]> => { 
    const response = await api.get('/todos'); 
    return response.data;
}

export const postTodo = async(title: string, description: string): Promise<Todo> => { 
  const response = await api.post('/todo', {title, description});
  return response.data;
}

export const updateTodo = async (
  id: number,
  updatedTodo: Partial<Todo>
): Promise<Todo> => {
  const response = await api.put(`/todos/${id}`, updatedTodo);
  return response.data;
};


export const updateStatusTodo = async (
  id: number,
  status: boolean
) => {
  try {
    const response = await api.patch(`/todos/status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};


export const deleteTodo = async(id: number): Promise<void> => { 
  await api.delete(`/todos/${id}` );
};
