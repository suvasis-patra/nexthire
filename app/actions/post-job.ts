"use server";

import * as z from "zod";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { JobpostSchema } from "@/validation/job-post";
import { makePayment } from "./payment";

export async function postJob(values: z.infer<typeof JobpostSchema>) {
  const session = await auth();
  const paramsValue = {
    ...values,
    minSalary: values.minSalary.toString(),
    maxSalary: values.maxSalary.toString(),
  };
  const userId = session?.user?.id as string;
  if (!session) {
    const queryString = new URLSearchParams(paramsValue).toString();
    redirect(`/auth/login?redirectTo=/hire-remotely?${queryString}`);
    return;
  }
  const validatedFields = JobpostSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Fill the form correctly!" };
  }

  const newJob = await db.jobPost.create({
    data: {
      ...validatedFields.data,
      location: validatedFields.data.location.split(","),
      keyword: validatedFields.data.keyword.split(","),
      userId,
    },
  });
  const paymentUrl = await makePayment(validatedFields.data, newJob.id);
  redirect(paymentUrl);
}
