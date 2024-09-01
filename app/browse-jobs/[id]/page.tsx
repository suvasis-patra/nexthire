import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { FaBriefcase, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import parse from "html-react-parser";
import { getTimeSincePosted } from "@/lib/utils";

export default async function GetJobPostDetails({
  params,
}: {
  params: { id: string | undefined };
}) {
  if (!params.id) {
    return <div>Job not found!</div>;
  }
  const job = await db.jobPost.findUnique({ where: { id: params.id } });
  if (!job) return null;
  const {
    applicationProcess,
    position,
    primaryTag,
    companyName,
    createdAt,
    employmentType,
    jobDescription,
    keyword,
    location,
    id,
    maxSalary,
    minSalary,
  } = job;
  return (
    <section className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-green-500 p-4 text-white">
          <h1 className="text-2xl font-bold">{position}</h1>
          <p className="text-lg font-semibold">{companyName}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <div className="flex flex-wrap gap-2">
                {location.map((loc, index) => (
                  <span
                    key={index}
                    className="bg-green-700 text-white px-2 py-1 rounded-full text-xs uppercase"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-base font-semibold capitalize flex items-center gap-2">
              <FaBriefcase />
              {employmentType}
            </div>
            <div className="flex items-center gap-2">
              <FaTag />
              {primaryTag}
            </div>
            <div className="flex flex-wrap gap-2">
              {keyword.map((kw, index) => (
                <span
                  key={index}
                  className="bg-teal-700 text-white font-semibold px-2 py-1 rounded-full text-xs capitalize"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-sm font-bold">
              {minSalary} - {maxSalary} USD
            </p>
          </div>
          <div className="text-sm">
            <h2 className="text-lg font-bold">Job Description</h2>
            <div className="mt-2 p-4 bg-gray-100 rounded-lg">
              {parse(jobDescription)}
            </div>
          </div>
          <div className="text-sm">
            <h2 className="text-lg font-bold">Application Details</h2>
            <div className="mt-2 p-4 bg-gray-100 rounded-lg">
              <div>{parse(applicationProcess)}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <p>Posted {getTimeSincePosted(createdAt)}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 flex justify-end">
          <Link href={`/apply-job/${id}`}>
            <Button className="bg-green-600 text-white hover:bg-green-700 transition duration-200">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
