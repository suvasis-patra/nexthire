import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";

import { getUserByEmail } from "./data/user";
import { comparePassword } from "./lib/utils";
import { UserLoginSchema } from "./validation/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = UserLoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new CredentialsSignin("Invalid credentials!!");
        }
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user) {
          throw new CredentialsSignin("Invalid credentials!!");
        }
        const isPasswordCorrect = await comparePassword(
          password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new CredentialsSignin("Invalid credentials!!");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
