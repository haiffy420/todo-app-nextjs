import { Todo } from "../interfaces/Todo.interface";
import { v4 as uuidv4 } from "uuid";

const TODO_STORAGE_KEY = "todos-haifan";

const getStoredTodos = (): Todo[] => {
  if (typeof window !== "undefined") {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
  return [];
};

let todos: Todo[] = getStoredTodos();

const updateStoredTodos = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    return;
  }
};

export const addTodo = (
  title: string,
  description: string,
  completed: boolean
) => {
  const newTodo: Todo = {
    id: uuidv4(),
    title,
    description,
    completed,
  };
  todos = [...todos, newTodo];
  updateStoredTodos();
};

export const getTodos = (): Todo[] => {
  return todos;
};

export const completeTodo = (id: string) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  updateStoredTodos();
};

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
  updateStoredTodos();
};

export const editTodo = (
  id: string,
  title: string,
  description: string,
  completed: boolean
) => {
  todos = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          title: title,
          description: description,
          completed: completed,
        }
      : todo
  );
  updateStoredTodos();
};
