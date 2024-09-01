"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserRegistrationSchema } from "@/validation/user";
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
import { register } from "@/app/actions/register";
import SuccessMessage from "@/components/success-message";
import ErrorMessage from "@/components/error-message";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserRegistrationSchema>) {
    console.log(values);
    setSuccess(undefined);
    setError(undefined);

    startTransition(async () => {
      try {
        console.log("values");
        const response = await register(values);

        if (response.success) {
          setSuccess(response.success);
          form.reset();
          router.push("/auth/login");
        } else {
          setError(response.error);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="bg-gray-100 px-4 py-6 md:py-8 md:px-10 rounded-2xl border border-black/15 w-full">
        <div className="w-full text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Welcome to Next<span className="text-green-600">Hire</span>
          </h1>
          <p className="text-md sm:text-lg text-gray-500">
            Create a new account here
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="input_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhondoe"
                      type="text"
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
          <Button
            type="submit"
            className="w-full hover:bg-green-600"
            disabled={isPending}
          >
            Register
          </Button>
          <p className="text-center text-md text-gray-400">
            Already have an account?
            <Link href="/auth/login" className="text-blue-500 underline">
              login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
