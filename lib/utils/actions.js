import { connectToDb } from "./db";
import { Todo, User } from "../models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { signIn } from "../auth";
import bcrypt from 'bcryptjs'
// Create a new todo
export const addTodo = async (
  userId,
  title,
  description,
  todoDetail,
  completed
) => {
  try {
    connectToDb();
    const newTodo = new Todo({
      userId,
      title,
      description,
      todoDetail,
      completed,
    });
    await newTodo.save();
  } catch (error) {
    throw new Error("Failed to add Todo");
  }
  revalidatePath("/todo");
};

// Get all todos by a specific user
export const getTodos = async (userId, q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDb();
    const todos = await Todo.find({ userId, title: { $regex: regex } });
    return { todos };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Todo");
  }
};

export const getTodo = async (id) => {
  try {
    connectToDb();
    const todos = await Todo.findById(id);
    return todos;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Todo");
  }
};

// Complete a todo
export const completeTodo = async (id) => {
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = !todo.completed;
    await todo.save();
  } catch (error) {
    throw new Error("Failed to edit Todo");
  }
  revalidatePath("/todo");
};

// Delete a todo
export const deleteTodo = async (todoId) => {
  try {
    await Todo.findByIdAndDelete(todoId);
  } catch (error) {
    throw new Error("Failed to fetch Todo");
  }
  revalidatePath("/todo");

};

// Edit a todo
export const editTodo = async ({
  id,
  title,
  description,
  todoDetail,
  completed,
}) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          todoDetail,
          completed,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );
    await updatedTodo;
  } catch (error) {
    throw new Error("Failed to fetch Todo");
  }
  revalidatePath("/todo");

};

export const register = async (registerDetails) => {
  const { name, email, password } = registerDetails
  const checkEmail = await User.find({ email: email }).count();
  if (checkEmail > 0) {
    revalidatePath('/register?failed=duplicate-email')
    return redirect('/register?failed=duplicate-email')
  }
  try {
    connectToDb()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })
    await newUser.save()
  } catch (err) {
    revalidatePath('/register?failed=error')
    redirect('/register?failed=error')
  }
  redirect('/login?register=success')
}

export const authenticate = async (loginDetails) => {

  const { email, password } = loginDetails

  try {
    await signIn('credentials', { email, password, redirect: false });  // add redirect false
  } catch (err) {
    revalidatePath('/login?login=failed')
    redirect('/login?login=failed');
  }
  redirect('/todo'); //manually redirect
}