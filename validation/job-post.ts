import * as z from "zod";

export const JobpostSchema = z.object({
  companyName: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  position: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  employmentType: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  primaryTag: z.optional(z.string()),
  keyword: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  location: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  minSalary: z
    .number({ required_error: "This field is required" })
    .min(1, "This field is required"),
  maxSalary: z
    .number({ required_error: "This field is required" })
    .min(1, "This field is required"),
  jobDescription: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  applicationEmail: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a valid email"),
  applicationProcess: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
});

export const JobFilterSchema = z.object({
  employmentType: z.optional(z.string()),
  minSalary: z.optional(z.string()),
  maxSalary: z.optional(z.string()),
  location: z.optional(z.string()),
});
