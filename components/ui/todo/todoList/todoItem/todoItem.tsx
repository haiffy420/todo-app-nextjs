"use client";

import {
  completeTodo as completeTodoLocal,
  deleteTodo as deleteTodoLocal,
  getTodos as getTodosLocal,
} from "@/lib/utils/todoUtils";
import { MdCheckCircle, MdCreate, MdDelete, MdUndo } from "react-icons/md";
import { useState } from "react";
import { useToast } from "../../../use-toast";
import TodoEdit from "../../todoForm/todoEdit";
import { Dialog, DialogTrigger } from "../../../dialog";
import { useGuestUser } from "@/lib/utils/generalUtils";
import {
  completeTodoServerAct,
  deleteTodoServerAct,
} from "@/lib/utils/todoUtilsServer";
import { Skeleton } from "@/components/ui/skeleton";

const TodoItem = ({ todo, setTodos }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const { toast } = useToast();
  const { _id, title, description, completed } = todo;
  const id = _id;
  const isGuestUser = useGuestUser();

  const handleCompleteTodo = async (id: string) => {
    try {
      if (isGuestUser) {
        completeTodoLocal(id);
        toast({
          description: "Todo has been updated.",
        });
        return setTodos(getTodosLocal());
      }
      await completeTodoServerAct(id);
      toast({
        description: "Todo has been updated.",
      });
    } catch {
      toast({
        description: "Error updating todo.",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      if (isGuestUser) {
        deleteTodoLocal(id);
        toast({
          description: "Todo has been deleted.",
        });
        return setTodos(getTodosLocal());
      }
      await deleteTodoServerAct(id);
      toast({
        description: "Todo has been deleted.",
      });
    } catch {
      toast({
        description: "Error deleting todo.",
      });
    }
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
                onClick={() => {
                  setLoading(true);
                  handleCompleteTodo(id);
                }}
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
                setTodos={setTodos}
                setOpenEditForm={setOpenEditForm}
                todo={todo}
              />
              <span className="sm:text-zinc-700 text-green-500 hover:text-green-500 cursor-pointer">
                <MdCheckCircle
                  onClick={() => {
                    setLoading(true);
                    handleCompleteTodo(id);
                  }}
                  title="Completed?"
                  className="hover:-translate-y-1"
                />
              </span>
            </>
          )}
          <span className="text-red-600 cursor-pointer">
            <MdDelete
              onClick={() => {
                setLoading(true);
                handleDeleteTodo(id);
              }}
              title="Delete"
              className="hover:-translate-y-1"
            />
          </span>
        </div>
        <Skeleton
          hidden={!loading}
          className="absolute top-0 -translate-x-4 w-full z-40 h-full -p-2 border-none"
        />
        <DialogTrigger>
          <div className="absolute top-0 -translate-x-4 w-full z-10 h-full rounded-md"></div>
        </DialogTrigger>
      </div>
    </Dialog>
  );
};

export default TodoItem;
