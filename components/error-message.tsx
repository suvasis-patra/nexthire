import { TriangleAlert } from "lucide-react";

interface MessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: MessageProps) {
  if (!message) return null;
  return (
    <div  className="bg-destructive/15 flex gap-x-2 text-sm text-destructive rounded-md p-3 items-center">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
}
