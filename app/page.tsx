"use client";
import Navbar from "@/components/ui/navbar/navbar";
import { useEffect, useState } from "react";
import { getTodos } from "@/lib/utils/todoUtils";
import { Todo } from "@/lib/types/Todo";
import TodoSection from "@/components/ui/todo/todo";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/ui/footer/footer";
import TodoAdd from "@/components/ui/todo/todoForm/todoAdd";
import Link from "next/link";
import { Info } from "lucide-react";

export default function Guest() {
  const [query, setQuery] = useState("");
  const [searchTodos, setSearchTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>(getTodos);

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
      <Navbar user={null} search={query} setQuery={setQuery} guestMode={true} />
      <main className="flex min-h-screen flex-col items-center p-4 gap-4">
        <div className="flex flex-col p-4 items-center justify-center text-sm font-medium rounded-md border-[1px] border-blue-500">
          <Info className="w-6 h-6 mb-2 text-blue-500" />
          <p>
            You&lsquo;re currently using a guest account! Your todos will only
            be saved on this device.
          </p>
          <Link href="/register" className="hover:text-blue-500">
            Click here to register
          </Link>
        </div>
        <TodoAdd user={null} setTodos={setTodos} />
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
