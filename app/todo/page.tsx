export const dynamic = "force-dynamic";
import Navbar from "@/components/ui/navbar/navbar";
import TodoSection from "@/components/ui/todo/todo";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/ui/footer/footer";
import { getTodos } from "@/lib/utils/actions.js";
import TodoAdd from "@/components/ui/todo/todoForm/todoAdd";
import { auth } from "@/lib/auth";

export default async function Home({ searchParams }) {
  const q = searchParams?.q || "";
  const session = await auth();
  const user = session?.user;
  const { todos } = await getTodos(user?.id, q);
  const stringifiedTodos = JSON.parse(JSON.stringify(todos));
  const activeTodos = stringifiedTodos.filter((todo) => !todo.completed);
  const completedTodos = stringifiedTodos.filter((todo) => todo.completed);

  return (
    <>
      <Navbar user={user} search={null} setQuery={null} guestMode={false} />
      <main className="flex min-h-screen flex-col items-center p-8 gap-4">
        <TodoAdd user={user} setTodos={null} />
        <TodoSection
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          setTodos={stringifiedTodos}
        />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
