"use client";

import {
  completeTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "@/lib/utils/todoUtils";
import { MdCheckCircle, MdCreate, MdDelete, MdUndo } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "../../use-toast";

const TodoItem = ({ id, title, description, completed, setTodos }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    completed: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      completed: completed,
    },
  });

  function onSubmit(todo: z.infer<typeof formSchema>) {
    const { title, description, completed } = todo;
    editTodo(id, title, description, completed);
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
    setOpen(false);
  }

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
      className="flex flex-col justify-between
      md:h-52 sm:h-auto gap-4
      bg-foreground dark:bg-zinc-900 rounded-md
      dark:text-foreground text-background
      p-4 translate-y-2
      shadow-[10px_10px_50px_-15px_rgba(0,0,0,0.7)] dark:shadow-none
      transition hover:shadow-[10px_10px_15px_-3px_rgba(0,0,0,0.7)] hover:border-2 hover:border-solid hover:border-zinc-900
      hover:shadow-zinc-900 dark:hover:shadow-lg dark:hover:shadow-slate-300 dark:hover:border-slate-300
      hover:translate-y-0 duration-300 ease-in-out"
    >
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
          <>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <span className="text-yellow-500 cursor-pointer">
                  <MdCreate
                    title="Edit"
                    className="translate-y-1 hover:translate-y-0"
                  />
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Todo</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid gap-4 py-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="completed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="pb-2.5">
                              <FormLabel>Completed ?</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <span className="text-green-500 cursor-pointer">
              <MdCheckCircle
                onClick={() => handleCompleteTodo(id)}
                title="Completed?"
                className="translate-y-1 hover:translate-y-0"
              />
            </span>
          </>
        )}
        <span className=" text-red-600 cursor-pointer">
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
