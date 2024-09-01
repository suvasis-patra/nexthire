"use server";

import * as z from "zod";
import { UserLoginSchema } from "@/validation/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(values: z.infer<typeof UserLoginSchema>) {
  const validatedFields = UserLoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }
  const { email, password } = validatedFields.data;
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid credenntials!" };
    }

    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication failed!" };
    }
    return { error: "Something went wrong!Failed to login." };
  }
}
