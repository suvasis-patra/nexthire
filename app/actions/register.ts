"use server";

import * as z from "zod";
import { UserRegistrationSchema } from "@/validation/user";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { getUserByEmail } from "@/data/user";

export async function register(
  userInfo: z.infer<typeof UserRegistrationSchema>
) {
  const validatedInfo = UserRegistrationSchema.safeParse(userInfo);

  if (!validatedInfo.success) {
    return { error: "Invalid user info" };
  }

  const { username, email, password } = validatedInfo.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: { username, email, password: hashedPassword },
    });

    return { success: "User registered successfully!" };
  } catch (error) {
    console.error("FAILED TO REGISTER:", error);
    return { error: "Failed to register!" };
  }
}
