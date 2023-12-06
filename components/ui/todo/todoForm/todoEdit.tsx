"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer as zodinfer } from "zod";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "../../use-toast";
import { TodoDetail } from "@/lib/types/Todo";
import TodoForm from "./todoForm";
import { formSchema, todoDetailSchema } from "@/lib/utils/todoFormUtils";
import {
  editTodo as editTodoLocal,
  getTodos as getTodosLocal,
} from "@/lib/utils/todoUtils";
import { useGuestUser } from "@/lib/utils/generalUtils";
import { editTodoServerAct } from "@/lib/utils/todoUtilsServer";

const TodoEdit = ({ todo, setTodos, setOpenEditForm }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { _id, title, description, todoDetail, completed } = todo;
  const id = _id;
  const [tempTodoDetails, setTempTodoDetails] = useState<TodoDetail[]>(
    todoDetail || []
  );
  const { toast } = useToast();
  const isGuestUser = useGuestUser();
  const form = useForm<zodinfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      todoDetail: todoDetail || [],
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

  async function onSubmit(todo: zodinfer<typeof formSchema>) {
    setLoading(true);
    const { title, description, completed } = todo;
    const isTodoDetailsValid = validateTodoDetails(tempTodoDetails);

    if (!isTodoDetailsValid) {
      toast({
        variant: "destructive",
        description: "Invalid task details.",
      });
      return;
    }

    try {
      if (isGuestUser) {
        editTodoLocal(id, title, description, tempTodoDetails, completed);
        toast({
          description: "Todo has been edited.",
        });
        setOpenEditForm(false);
        setTodos(getTodosLocal());
        setLoading(false);
        return;
      } else {
        await editTodoServerAct(
          id,
          title,
          description,
          tempTodoDetails,
          completed
        );
        toast({
          description: "Todo has been edited.",
        });
      }

      setLoading(false);
      return setOpenEditForm(false);
    } catch {
      toast({
        variant: "destructive",
        description: "Error editing todo.",
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Edit Todo</DialogTitle>
      </DialogHeader>
      <TodoForm
        loading={loading}
        setTempTodoDetails={setTempTodoDetails}
        tempTodoDetails={tempTodoDetails}
        form={form}
        onSubmit={onSubmit}
        isEditing={true}
      />
    </DialogContent>
  );
};

export default TodoEdit;
