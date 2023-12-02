"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer as zodinfer } from "zod";
import { MdCheckCircle, MdCreate } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "../../use-toast";
import { TodoDetail } from "@/lib/types/Todo";
import TodoForm from "./todoForm";
import { formSchema, todoDetailSchema } from "@/lib/utils/todoFormUtils";
import { editTodo, getTodos } from "@/lib/utils/todoUtils";

const TodoEdit = ({
  id,
  title,
  description,
  todoDetail,
  completed,
  openEditForm,
  setTodos,
  setOpenEditForm,
  handleCompleteTodo,
}) => {
  const [tempTodoDetails, setTempTodoDetails] = useState<TodoDetail[]>(
    todoDetail ? todoDetail : []
  );
  const { toast } = useToast();

  const form = useForm<zodinfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      todoDetail: todoDetail ? todoDetail : [],
      completed: completed,
    },
  });

  const validateTodoDetails = (details) => {
    return details.every((detail) => {
      try {
        todoDetailSchema.parse(detail);
        return true;
      } catch (error) {
        return false;
      }
    });
  };

  function onSubmit(todo: zodinfer<typeof formSchema>) {
    const { title, description, completed } = todo;
    const isTodoDetailsValid = validateTodoDetails(tempTodoDetails);

    if (!isTodoDetailsValid) {
      toast({
        variant: "destructive",
        description: "Invalid task details.",
      });
      return;
    }

    editTodo(id, title, description, tempTodoDetails, completed);
    if (!editTodo) {
      return toast({
        variant: "destructive",
        description: "Failed to update todo.",
      });
    }
    toast({
      description: "Your todo has been edited.",
    });
    setTodos(getTodos());
    setOpenEditForm(false);
  }

  return (
    <>
      <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
        <DialogTrigger>
          <span className="text-yellow-500 cursor-pointer">
            <MdCreate
              title="Edit"
              className="translate-y-1 hover:translate-y-0"
            />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <TodoForm
            setTempTodoDetails={setTempTodoDetails}
            tempTodoDetails={tempTodoDetails}
            form={form}
            onSubmit={onSubmit}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>
      <span className="sm:text-zinc-700 text-green-500 hover:text-green-500 cursor-pointer">
        <MdCheckCircle
          onClick={() => handleCompleteTodo(id)}
          title="Completed?"
          className="translate-y-1 hover:translate-y-0"
        />
      </span>
    </>
  );
};

export default TodoEdit;
