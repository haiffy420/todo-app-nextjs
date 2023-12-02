"use client";

import { completeTodo, deleteTodo, getTodos } from "@/lib/utils/todoUtils";
import { MdCheckCircle, MdCreate, MdDelete, MdUndo } from "react-icons/md";
import { useState } from "react";
import { useToast } from "../../use-toast";
import TodoEdit from "../todoForm/todoEdit";
import { Dialog, DialogTrigger } from "../../dialog";

const TodoItem = ({ todo, setTodos }) => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const { toast } = useToast();
  const { id, title, description, completed, todoDetail } = todo;

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
    <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
      <div key={id} className="todo-card">
        <div className="pb-8">
          <h1 className="text-4xl md:text-2xl font-bold">{title}</h1>
          <p className="flex text-lg md:text-lg font-light text-ellipsis overflow-hidden ...">
            {description}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 z-20 flex flex-row justify-end gap-2 text-3xl md:text-4xl lg:text-2xl">
          {completed ? (
            <span className="text-yellow-500 cursor-pointer">
              <MdUndo
                onClick={() => handleCompleteTodo(id)}
                title="Undo"
                className="hover:-translate-y-1"
              />
            </span>
          ) : (
            <>
              <DialogTrigger>
                <span className="text-yellow-500 cursor-pointer">
                  <MdCreate title="Edit" className="hover:-translate-y-1" />
                </span>
              </DialogTrigger>
              <TodoEdit
                openEditForm={openEditForm}
                setTodos={setTodos}
                setOpenEditForm={setOpenEditForm}
                handleCompleteTodo={handleCompleteTodo}
                {...todo}
              />
              <span className="sm:text-zinc-700 text-green-500 hover:text-green-500 cursor-pointer">
                <MdCheckCircle
                  onClick={() => handleCompleteTodo(id)}
                  title="Completed?"
                  className="hover:-translate-y-1"
                />
              </span>
            </>
          )}
          <span className="text-red-600 cursor-pointer">
            <MdDelete
              onClick={() => handleDeleteTodo(id)}
              title="Delete"
              className="hover:-translate-y-1"
            />
          </span>
        </div>
        <DialogTrigger>
          <div className="absolute top-0 -translate-x-4 w-full z-10 h-full rounded-md border-solid border-fuchsia-700"></div>
        </DialogTrigger>
      </div>
    </Dialog>
  );
};

export default TodoItem;
