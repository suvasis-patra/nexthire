import { db } from "@/lib/db";
import { JobFilterSchema } from "@/validation/job-post";
import * as z from "zod";

export async function getFilteredJobs(query: z.infer<typeof JobFilterSchema>) {
  const { employmentType, minSalary, maxSalary, location } = query;

  const whereConditions: any = {};

  if (minSalary) {
    whereConditions.minSalary = { gte: parseInt(minSalary, 10) };
  }
  if (maxSalary) {
    whereConditions.maxSalary = { lte: parseInt(maxSalary, 10) };
  }

  if (location) {
    whereConditions.location = {
      in: location.split(",").map((loc) => loc.trim()),
    };
  }

  if (employmentType) {
    whereConditions.employmentType = employmentType;
  }

  if (!whereConditions) {
    const jobs = await db.jobPost.findMany();
    return jobs;
  }

  const jobs = await db.jobPost.findMany({
    where: whereConditions,
  });

  return jobs;
}
