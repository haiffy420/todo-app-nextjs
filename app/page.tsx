"use client";
import Navbar from "@/components/ui/navbar/navbar";
import { useEffect, useState } from "react";
import { getTodos } from "./utils/todoUtils";
import { Todo } from "./interfaces/Todo.interface";
import TodoSection from "@/components/ui/todo/todoSection";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

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
      <div className="sticky bottom-0 z-50 w-full border-t bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center justify-between px-2 shadow-xl">
        <div className="w-full flex flex-row items-center justify-between p-4 gap-2">
          <div className="flex flex-row gap-4">
            <Link href={"https://github.com/haiffy420/"}>
              <FaGithubSquare className="text-4xl" />
            </Link>
            <Link href={"https://linkedin.com/in/haifan"}>
              <FaLinkedin className="text-4xl" />
            </Link>
          </div>
          <p>Next.js Todo App || Made by Haifan with ❤️ and ☕</p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
