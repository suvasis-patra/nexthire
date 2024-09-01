import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

type ParamsType = {
  searchParams: {
    session_id: string;
  };
};

export default function PaymentSuccess({ searchParams }: ParamsType) {
  const sessionId = searchParams?.session_id;
  console.log(sessionId);
  return (
    <div className="w-full flex justify-center mt-4 md:mt-8 px-2 md:px-8">
      <div className="bg-green-600 px-4 py-4 text-white text-center flex flex-col gap-4 justify-center items-center md:min-w-[450px] rounded-lg border border-black">
        <CheckCircle size={30} className="text-white" />
        <p className="text-xl md:text-3xl font-bold"> Payment successful!</p>
        <Link href="/">
          <Button className="font-semibold text-black" variant="outline">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
