import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const session = await auth();
  console.log(session);
};
