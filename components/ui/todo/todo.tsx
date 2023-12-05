"use client";
import { usePathname } from "next/navigation";
import TodoList from "./todoList/todoList";

const TodoSection = ({ activeTodos, completedTodos, setTodos }) => {
  const pathname = usePathname();

  return (
    <>
      <TodoList label="My Todos" setTodos={setTodos} todos={activeTodos} />
      <TodoList label="Completed" setTodos={setTodos} todos={completedTodos} />
    </>
  );
};

export default TodoSection;
