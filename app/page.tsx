import Link from "next/link";

import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main>
      <section className="bg-white py-10 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Find Your Dream Job
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Browse thousands of job listings to find the perfect fit for you.
          </p>
          <Link href="/browse-jobs">
            <Button className="mt-6 inline-block px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-gray-200 py-10 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Popular Job Categories
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600">
                Engineering
              </h3>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Find jobs in software development, mechanical engineering, and
                more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600">
                Marketing
              </h3>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Explore jobs in digital marketing, content creation, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600">
                Design
              </h3>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Discover jobs in graphic design, UI/UX design, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            What Our Users Say
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm sm:text-base">
                This job board helped me find my dream job in just a few days!
              </p>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
                Jane Doe
              </h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm sm:text-base">
                I highly recommend this site to anyone looking for a new
                opportunity.
              </p>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
                John Smith
              </h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-600 text-sm sm:text-base">
                Great experience! The job categories made it easy to find
                relevant jobs.
              </p>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
                Emily Johnson
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-10 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start?</h2>
          <p className="mt-4 text-sm sm:text-base">
            Sign up today and land your dream job tomorrow.
          </p>
          <Button variant="outline" className="text-black">
            Get Started
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
