import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  todoDetail: z
    .array(
      z.object({
        title: z.string().min(2, {
          message: "Task title must be at least 2 characters.",
        }),
        completed: z.boolean().default(false),
      })
    )
    .optional(),
  completed: z.boolean().default(false),
});

export const todoDetailSchema = z.object({
  title: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  completed: z.boolean().default(false),
});
