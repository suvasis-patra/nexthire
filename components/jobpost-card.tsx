import { JobPost } from "@prisma/client";
import { FaMapMarkerAlt, FaBriefcase, FaTag } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTimeSincePosted } from "@/lib/utils";
import Link from "next/link";

export default function JobPostCard({ job }: { job: JobPost }) {
  const {
    id,
    companyName,
    position,
    createdAt,
    keyword,
    location,
    employmentType,
    primaryTag,
    maxSalary,
    minSalary,
  } = job;

  return (
    <article className="max-w-sm mx-auto h-full">
      <Card className="shadow-md border-2 border-green-500 rounded-lg h-full flex flex-col gap-3 px-2">
        <CardHeader className="rounded-t-lg">
          <h3 className="text-xl font-bold capitalize">{position}</h3>
          <p className="text-sm uppercase font-semibold">{companyName}</p>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <div className="text-sm flex flex-col gap-2">
            <div>
              <div className="flex items-start gap-2">
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
            </div>
            <p className="text-base font-semibold capitalize flex items-center gap-2">
              <FaBriefcase />
              {employmentType}
            </p>
            <p className="flex items-center gap-2">
              <FaTag />
              {primaryTag}
            </p>
            <div>
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
            </div>
          </div>
          <div className="text-sm">
            <p className="font-bold">
              {minSalary} - {maxSalary} USD
            </p>
          </div>
        </CardContent>
        <CardFooter className="rounded-b-lg flex flex-col gap-2 items-start">
          <p className="text-xs">{getTimeSincePosted(createdAt)}</p>
          <div className="flex w-full justify-end gap-3">
            <Link href={`/browse-jobs/${id}`}>
              <Button variant="secondary">Details</Button>
            </Link>
            <Button className="bg-green-600 text-white hover:bg-gray-100 hover:text-green-500 transition duration-200">
              Apply Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}
