import Link from "next/link";

import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex w-full px-8 md:px-12 lg:px-20 justify-between items-center py-4 sticky top-0 z-50 bg-white/30 backdrop-blur-lg shadow-lg">
      <div>
        <h3 className="text-3xl md:text-5xl font-bold">
          Next<span className="text-green-600">Hire</span>
        </h3>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="outline" className="font-semibold">
          <Link href="/hire-remotely"> Post Job</Link>
        </Button>
        {!session ? (
          <Button className="bg-green-600 text-white font-semibold">
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          <>
            <form
              action={async () => {
                "use server";
                await signOut();
                redirect("/auth/login");
              }}
            >
              <Button type="submit" variant="outline">
                Logout
              </Button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
