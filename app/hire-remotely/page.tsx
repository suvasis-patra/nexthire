import { auth } from "@/auth";
import JobpostForm from "@/components/jobpost-form";

export default async function HirePeople() {
  return (
    <div className="flex items-center justify-center px-4">
      <JobpostForm />
    </div>
  );
}
