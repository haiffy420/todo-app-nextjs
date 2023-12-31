"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer as zodinfer } from "zod";
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
import {
  addTodo as addTodoLocal,
  getTodos as getTodosLocal,
} from "@/lib/utils/todoUtils";
import { Button } from "../../button";
import { FaPlus } from "react-icons/fa";
import { addTodoServerAct } from "../../../../lib/utils/todoUtilsServer";

const TodoAdd = ({ user, setTodos }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const [tempTodoDetails, setTempTodoDetails] = useState<TodoDetail[]>([]);
  const isGuestUser = !user;

  const form = useForm<zodinfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      todoDetail: tempTodoDetails,
      completed: false,
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
    if (isGuestUser) {
      addTodoLocal("", title, description, tempTodoDetails, completed);
      await setTodos(getTodosLocal());
    } else {
      await addTodoServerAct(
        user?.id,
        title,
        description,
        tempTodoDetails,
        completed
      );
    }

    toast({
      description: "Your todo has been added.",
    });

    setLoading(false);
    form.reset();
    setTempTodoDetails([]);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background hover:text-background shadow-lg gap-4"
          >
            <FaPlus /> Add Todo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <TodoForm
            loading={loading}
            setTempTodoDetails={setTempTodoDetails}
            tempTodoDetails={tempTodoDetails}
            form={form}
            onSubmit={onSubmit}
            isEditing={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoAdd;
