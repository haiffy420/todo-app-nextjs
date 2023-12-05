"use server";

import {
  addTodo,
  getTodos,
  deleteTodo,
  completeTodo,
  editTodo,
  authenticate,
} from "@/lib/utils/actions.js";
import { auth, signOut } from "../auth";
import { register } from "./actions";

export async function registerServerAct(registerDetails) {
  return await register(registerDetails);
}

export async function getTodosServerAct(userId, q) {
  const { todos } = await getTodos(userId, q);
  const stringifiedTodos = JSON.parse(JSON.stringify(todos));
  return stringifiedTodos;
}

export async function addTodoServerAct(
  userId,
  title,
  description,
  tempTodoDetails,
  completed
) {
  const todo = await addTodo(
    userId,
    title,
    description,
    tempTodoDetails,
    completed
  );
  return todo;
}

export async function deleteTodoServerAct(id) {
  return await deleteTodo(id);
}

export async function completeTodoServerAct(id) {
  return await completeTodo(id);
}

export async function editTodoServerAct(
  id,
  title,
  description,
  todoDetail,
  completed
) {
  return await editTodo({ id, title, description, todoDetail, completed });
}

export async function authServerAct(loginDetails) {
  return await authenticate(loginDetails);
}

export async function getSessionServerAct() {
  const user = await auth();
  return user;
}

export async function signOutServerAct() {
  return await signOut();
}
