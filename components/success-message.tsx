import { CircleCheck } from "lucide-react";

export default function SuccessMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 flex gap-x-2 text-emerald-500 items-center text-sm rounded-md">
      <CircleCheck />
      <p>{message}</p>
    </div>
  );
}
