"use client";

import { useEffect, useState } from "react";
import TodoItem from "./todoItem/todoItem";
import { Skeleton } from "../../skeleton";

const TodoList = ({ todos, setTodos, label }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 pb-10">
      <h1 className="text-xl font-bold">{label}</h1>
      {loading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Skeleton className="h-36 translate-y-2 bg-foreground dark:bg-muted" />
          <Skeleton className="h-36 translate-y-2 bg-foreground dark:bg-muted" />
          <Skeleton className="h-36 translate-y-2 bg-foreground dark:bg-muted" />
          <Skeleton className="h-36 translate-y-2 bg-foreground dark:bg-muted" />
        </div>
      ) : (
        <>
          {todos?.length === 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <p className="md:h-36 sm:h-auto">No todos to show.</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {todos?.map((todo) => {
                return (
                  <TodoItem setTodos={setTodos} key={todo._id} todo={todo} />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
