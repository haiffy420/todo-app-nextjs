import { connectToDb } from "./db";
import { Todo } from "../models";

export const fetchTodos = async () => {
  try {
    connectToDb();
    const todos = await Todo.find({});
    return todos;
  } catch (err) {
    throw new Error("Failed to fetch user");
  }
};
