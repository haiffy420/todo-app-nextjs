"use client";

import { completeTodo, deleteTodo, getTodos } from "@/lib/utils/todoUtils";
import { MdDelete, MdUndo } from "react-icons/md";
import { useState } from "react";
import { useToast } from "../../use-toast";
import TodoEditForm from "../todoForm/todoEditForm";

const TodoItem = ({
  id,
  title,
  description,
  todoDetail,
  completed,
  setTodos,
}) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const { toast } = useToast();

  const handleCompleteTodo = (id: string) => {
    completeTodo(id);
    toast({
      description: "Todo updated.",
    });
    setTodos(getTodos());
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    toast({
      description: "Todo deleted.",
    });
    setTodos(getTodos());
  };

  return (
    <div
      key={id}
      // onClick={() =>
      //   openEditForm ? setOpenEditForm(false) : setOpenEditForm(true)
      // }
      className="flex flex-col justify-between
      md:h-52 sm:h-auto gap-4
      bg-foreground dark:bg-zinc-900 rounded-md
      dark:text-foreground text-background cursor-pointer
      p-4 translate-y-2
      shadow-[10px_10px_50px_-15px_rgba(0,0,0,0.7)] dark:shadow-none
      transition hover:shadow-[10px_10px_15px_-3px_rgba(0,0,0,0.7)] hover:border-2 hover:border-solid hover:border-zinc-900
      hover:shadow-zinc-900 dark:hover:shadow-lg dark:hover:shadow-slate-300 dark:hover:border-slate-300
      hover:translate-y-0 duration-300 ease-in-out"
    >
      <div className="truncate ...">
        <h1 className="text-4xl md:text-2xl font-bold">{title}</h1>
        <p className="text-xl md:text-lg font-light">{description}</p>
      </div>
      <div className="flex flex-row justify-end gap-2 text-4xl lg:text-2xl md:text-4xl">
        {completed ? (
          <span className="text-yellow-500 cursor-pointer">
            <MdUndo
              onClick={() => handleCompleteTodo(id)}
              title="Undo"
              className="translate-y-1 hover:translate-y-0"
            />
          </span>
        ) : (
          <TodoEditForm
            openEditForm={openEditForm}
            setTodos={setTodos}
            setOpenEditForm={setOpenEditForm}
            handleCompleteTodo={handleCompleteTodo}
            id={id}
            title={title}
            description={description}
            completed={completed}
            todoDetail={todoDetail}
          />
        )}
        <span className="text-red-600 cursor-pointer">
          <MdDelete
            onClick={() => handleDeleteTodo(id)}
            title="Delete"
            className="translate-y-1 hover:translate-y-0"
          />
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
