"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState, useTransition } from "react";
import { login } from "@/app/actions/login";
import { UserLoginSchema } from "@/validation/user";
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
import SuccessMessage from "@/components/success-message";
import ErrorMessage from "@/components/error-message";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginFormComponent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirectTo");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserLoginSchema>) {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const response = await login(values);
        if (response.success) {
          setSuccess(response.success);
          router.push(redirectUrl || "/");
        } else {
          setError(response.error);
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="bg-gray-100 px-4 py-6 md:py-8 md:px-10 rounded-2xl border border-black/15 w-full">
        <div className="w-full text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Welcome Back !</h1>
          <p className="text-md sm:text-lg text-gray-500">
            Login to your account here
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhondoe@gmail.com"
                      type="email"
                      {...field}
                      disabled={isPending}
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
                  <FormLabel className="input_label">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SuccessMessage message={success} />
          <ErrorMessage message={error} />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-center text-md text-gray-400">
            Not have an account?
            <Link href="/auth/register" className="text-blue-500 underline">
              register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormComponent />
    </Suspense>
  );
}
