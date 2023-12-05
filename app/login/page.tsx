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
import { authServerAct } from "@/lib/utils/todoUtilsServer";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
});

export function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("register") === "success") {
      toast({ description: "Successfully registered." });
      setLoading(false);
    }
    if (searchParams.get("login") === "failed") {
      toast({
        variant: "destructive",
        description: "Wrong email or password!",
      });
      setLoading(false);
    }
  }, [searchParams, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(loginDetails: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      authServerAct(loginDetails);
    } catch (err) {
      console.log(err);
      toast({ description: "Something went wrong. Please try again." });
    }
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center pb-8">
        <div className="pb-4">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
        <div className="login-card">
          <p className="text-xl">Login</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="hover:text-blue-500">
              Register
            </Link>
          </p>
          <p>
            <Link href="/" className="hover:text-blue-500">
              Or login as a guest
            </Link>
          </p>
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default LoginPage;
