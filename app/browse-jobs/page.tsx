import JobFilters from "@/components/filter";
import JobPostCard from "@/components/jobpost-card";
import { db } from "@/lib/db";

export default async function Jobs({
  searchParams,
}: {
  searchParams: {
    employmentType?: string;
    minSalary?: string;
    maxSalary?: string;
    location?: string;
  };
}) {
  let jobs = await db.jobPost.findMany();

  if (searchParams) {
    const employmentType = searchParams.employmentType;
    const location = searchParams.location;
    const minSalary = searchParams.minSalary;
    const maxSalary = searchParams.maxSalary;

    const filters: any = {};

    if (employmentType) {
      filters.employmentType = employmentType;
    }

    if (location) {
      filters.location = {
        in: location.split(",").map((loc) => loc.trim()),
      };
    }

    if (minSalary) {
      filters.minSalary = { gte: parseInt(minSalary.split(" ")[0]) * 1000 };
      console.log(filters.minSalary);
    }

    if (maxSalary) {
      filters.maxSalary = { lte: parseInt(maxSalary.split(" ")[0]) * 1000 };
      console.log(filters.maxSalary);
    }

    jobs = await db.jobPost.findMany({
      where: filters,
    });
  }
  return (
    <main className="flex flex-col gap-6 max-w-[1200px] mx-auto pt-4 px-3 md:px-8">
      <section className="w-full flex justify-center">
        <JobFilters />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {jobs?.map((job) => (
          <JobPostCard job={job} key={job.id} />
        ))}
      </section>
    </main>
  );
}
