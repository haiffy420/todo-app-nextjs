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
import { addTodo, getTodos } from "@/lib/utils/todoUtils";
import { Button } from "../../button";
import { FaPlus } from "react-icons/fa";

const TodoAdd = ({ setTodos }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [tempTodoDetails, setTempTodoDetails] = useState<TodoDetail[]>([]);

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

    addTodo(title, description, tempTodoDetails, completed);
    if (!addTodo) {
      return toast({
        variant: "destructive",
        description: "Failed to add todo.",
      });
    }
    toast({
      description: "Your todo has been saved.",
    });
    setTodos(getTodos());
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
