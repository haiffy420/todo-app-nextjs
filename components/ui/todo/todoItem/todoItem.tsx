"use client";

import { completeTodo, deleteTodo, getTodos } from "@/lib/utils/todoUtils";
import { MdDelete, MdUndo } from "react-icons/md";
import { useState } from "react";
import { useToast } from "../../use-toast";
import TodoEdit from "../todoForm/todoEdit";

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

  const handleOpenEditForm = () => {
    // openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
    // setOpenEditForm(true);
    console.log("funny");
  };

  return (
    <div key={id} className="todo-card" onClick={handleOpenEditForm}>
      <div>
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
          <TodoEdit
            openEditForm={openEditForm}
            setTodos={setTodos}
            setOpenEditForm={setOpenEditForm}
            handleCompleteTodo={handleCompleteTodo}
            {...todo}
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
