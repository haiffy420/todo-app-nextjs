"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
import TodoDetailList from "./todoDetailList";
import { ScrollArea } from "../../scroll-area";
import { Loader2 } from "lucide-react";

const TodoForm = ({
  loading,
  setTempTodoDetails,
  tempTodoDetails,
  form,
  onSubmit,
  isEditing,
}) => {
  const handleAddTodoDetail = () => {
    const newTodoDetail = {
      id: uuidv4(),
      title: "",
      completed: false,
    };
    setTempTodoDetails([...tempTodoDetails, newTodoDetail]);
  };

  const handleTodoDetailInput = (e, index, todoDetail) => {
    const updatedTodoDetails = [...tempTodoDetails];
    updatedTodoDetails[index] = {
      ...todoDetail,
      title: e.target.value,
    };
    setTempTodoDetails(updatedTodoDetails);
  };

  const handleCompleteTodoDetail = (index, todoDetail) => {
    const updatedTodoDetails = [...tempTodoDetails];
    updatedTodoDetails[index] = {
      ...todoDetail,
      completed: !todoDetail.completed,
    };
    setTempTodoDetails(updatedTodoDetails);
  };

  const handleDeleteTodoDetail = (index) => {
    const updatedTodoDetails = [...tempTodoDetails];
    updatedTodoDetails.splice(index, 1);
    setTempTodoDetails(updatedTodoDetails);
  };

  const handleSetAllTasksCompleted = (completed: boolean) => {
    const updatedTodoDetails = tempTodoDetails.map((todoDetail) => ({
      ...todoDetail,
      completed,
    }));
    setTempTodoDetails(updatedTodoDetails);
  };

  return (
    <>
      <ScrollArea className="max-h-[590px] sm:max-w-[450px] pr-7 ml-1 -mr-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4 px-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
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
                      <Textarea {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleAddTodoDetail}
                className="my-2"
              >
                + Add Task
              </Button>
              <TodoDetailList
                tempTodoDetails={tempTodoDetails}
                handleCompleteTodoDetail={handleCompleteTodoDetail}
                handleDeleteTodoDetail={handleDeleteTodoDetail}
                handleTodoDetailInput={handleTodoDetailInput}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value);
                          handleSetAllTasksCompleted(value);
                        }}
                      />
                    </FormControl>
                    <div className="pb-2.5">
                      <FormLabel>Mark as Done</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {isEditing ? (
              <DialogFooter className="flex flex-row justify-between">
                <DialogClose asChild>
                  <Button disabled={loading} type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            ) : (
              <DialogFooter>
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      </ScrollArea>
    </>
  );
};

export default TodoForm;
