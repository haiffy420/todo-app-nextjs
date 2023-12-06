"use client";
import { Inter } from "next/font/google";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerServerAct } from "@/lib/utils/todoUtilsServer";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(35, {
        message: "Name must be at least 35 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at leat 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at leat 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match!",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("failed") === "duplicate-email") {
      toast({
        variant: "destructive",
        description: "Email already exists!",
      });
      setLoading(false);
    }
    if (searchParams.get("failed") === "error") {
      toast({
        variant: "destructive",
        description: "Something went wrong, please try again.",
      });
      setLoading(false);
    }
  }, [searchParams, toast, form]);

  function onSubmit(loginDetails: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      registerServerAct(loginDetails);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register, try again.",
      });
    }
  }

  return (
    <Suspense>
      <main className="flex min-h-screen flex-col items-center justify-center pb-10">
        <div className="pb-4">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
        <div className="login-card">
          <p className="text-xl">Register</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-900 dark:bg-background"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-900 dark:bg-background"
                        placeholder="johndoe@gmail.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-900 dark:bg-background"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-900 dark:bg-background"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-start">
                {loading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="outline"
                    className="dark:bg-foreground hover:bg-gray-300 bg-background text-foreground dark:text-background"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="hover:text-blue-500 font-bold">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Toaster />
    </Suspense>
  );
}
