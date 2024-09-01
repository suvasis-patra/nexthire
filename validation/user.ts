import * as z from "zod";

export const UserRegistrationSchema = z.object({
  username: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),

  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a valid email"),

  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "Password is too short"),
});

export const UserLoginSchema = z.object({
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a valid email"),

  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "Password is too short"),
});
