import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    console.error("failed to get user by email:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findFirst({ where: { id } });
    return user;
  } catch (error) {
    console.error("failed to get user by id:", error);
    return null;
  }
}
