"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobpostSchema } from "@/validation/job-post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMPLOYMENT_TYPE, SALARY, PRIMARY_TAGS } from "@/lib/constants";
import UplodaImage from "./upload-image";
import { Suspense, useTransition } from "react";
import Tiptap from "./tip-tap";
import { postJob } from "@/app/actions/post-job";
import { useSearchParams } from "next/navigation";

type JobpostType = z.infer<typeof JobpostSchema>;

function JobpostFormComponent() {
  const params = useSearchParams();
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const defaultValues = {
    companyName: params.get("companyName") || "",
    position: params.get("position") || "",
    employmentType: params.get("employmentType") || "",
    primaryTag: params.get("primaryTag") || "",
    keyword: params.get("keyword") || "",
    location: params.get("location") || "",
    minSalary: parseInt(params.get("minSalary")!) || 0,
    maxSalary: parseInt(params.get("maxSalary")!) || 0,
    jobDescription: params.get("jobDescription") || "",
    applicationEmail: params.get("applicationEmail") || "",
    applicationProcess: params.get("applicationProcess") || "",
  };

  const form = useForm<z.infer<typeof JobpostSchema>>({
    resolver: zodResolver(JobpostSchema),
    defaultValues,
  });
  async function onSubmit(values: z.infer<typeof JobpostSchema>) {
    console.log(values, "hello");
    startTransition(() => {
      postJob(values);
    });
  }
  console.log(form.formState.errors);
  return (
    <div className="max-w-[70rem] w-full">
      <Form {...form}>
        <div className="bg-gray-100 px-4 py-6 md:py-8 md:px-10 rounded-2xl border border-black/15 w-full">
          <h1 className="uppercase text-3xl font-bold text-green-800 text-center mb-4">
            post a new job opening
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-6">
              {" "}
              {/* <div>
                <p className="uppercase font-bold text-base mb-2">
                  upload company logo
                </p>{" "}
                <UplodaImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div> */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="input_ele"
                        placeholder="Enter company name"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">Position</FormLabel>
                    <FormControl>
                      <Input
                        className="input_ele"
                        placeholder="Enter position"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">
                      employment type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Employment Type"
                            className="placeholder:capitalize"
                          />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryTag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">primary tag</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select Primary Tag"
                            className="placeholder:capitalize"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIMARY_TAGS.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">
                      keyword or tech stack
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="Enter keyword, tech stack comma separated e.g. reactjs, typescript etc"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">locations</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        placeholder="Enter locations comma separated"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">
                      minimum salary in USD
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="number"
                        {...field}
                        {...form.register("minSalary", { valueAsNumber: true })}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">
                      maximum salary in USD
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="number"
                        {...field}
                        {...form.register("maxSalary", { valueAsNumber: true })}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">
                      job description
                    </FormLabel>
                    <FormControl>
                      <Tiptap onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">company email</FormLabel>
                    <FormControl>
                      <Input
                        className="input_ele"
                        placeholder="Enter email to send the applications"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicationProcess"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_label">how to apply</FormLabel>
                    <FormControl>
                      <Tiptap onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-full hover:bg-green-600 font-semibold py-3"
              disabled={isPending}
            >
              Post a Job
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default function JobpostForm() {
  return (
    <Suspense>
      <JobpostFormComponent />
    </Suspense>
  );
}
