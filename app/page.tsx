"use client";
import Navbar from "@/components/ui/navbar/navbar";
import { useEffect, useState } from "react";
import { getTodos } from "../lib/utils/todoUtils";
import { Todo } from "@/lib/types/Todo";
import TodoSection from "@/components/ui/todo/todoSection";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/ui/footer/footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchTodos, setSearchTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>(getTodos());

  const activeTodos = (searchTodos || todos).filter((todo) => !todo.completed);
  const completedTodos = (searchTodos || todos).filter(
    (todo) => todo.completed
  );

  useEffect(() => {
    setSearchTodos(
      todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          todo.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, todos]);

  return (
    <>
      <Navbar search={query} setQuery={setQuery} />
      <main className="flex min-h-screen flex-col items-center p-8 gap-4">
        <TodoSection
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          setTodos={setTodos}
        />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
