"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { JobFilterSchema } from "@/validation/job-post";
import { COUNTRIES, EMPLOYMENT_TYPE, SALARY } from "@/lib/constants";

export default function JobFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const form = useForm<z.infer<typeof JobFilterSchema>>({
    resolver: zodResolver(JobFilterSchema),
    defaultValues: {
      employmentType: params.get("employmentType") || "",
      maxSalary: params.get("maxSalary") || "",
      minSalary: params.get("minSalary") || "",
      location: params.get("location") || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof JobFilterSchema>) => {
    console.log(data);
    const queryParam = new URLSearchParams();
    if (data.location) queryParam.append("location", data.location);
    if (data.maxSalary) queryParam.append("maxSalary", data.maxSalary);
    if (data.minSalary) queryParam.append("minSalary", data.minSalary);
    if (data.employmentType)
      queryParam.append("employmentType", data.employmentType);
    router.push(`/browse-jobs?${queryParam}`);
  };

  return (
    <div className="max-w-[800px] md:min-w-[750px] px-2 md:px-4 lg:px-8 border border-green-500 py-2 md:py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="w-full flex flex-col md:flex-row md:gap-3 md:items-center">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-1/2">
                  <FormLabel className="filter_input_label">job type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EMPLOYMENT_TYPE.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-1/2">
                  <FormLabel className="filter_input_label">location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Search by location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row md:gap-3 md:items-center">
            <FormField
              control={form.control}
              name="minSalary"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-1/2">
                  <FormLabel className="filter_input_label">
                    minimum salary
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Minimum Salary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SALARY.map((salary) => (
                        <SelectItem key={salary} value={salary}>
                          {salary}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxSalary"
              render={({ field }) => (
                <FormItem className="flex-1 md:w-1/2">
                  <FormLabel className="filter_input_label">
                    maximum salary
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Maximum Salary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SALARY.map((salary) => (
                        <SelectItem key={salary} value={salary}>
                          {salary}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-end gap-4">
            <Button
              variant="outline"
              className="hover:bg-green-600 hover:text-white capitalize font-semibold"
              type="button"
              onClick={() => {
                form.reset();
                router.push("/browse-jobs");
              }}
            >
              clear filters
            </Button>
            <Button
              className="capitalize font-semibold hover:bg-teal-600 hover:text-white"
              type="submit"
            >
              apply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
