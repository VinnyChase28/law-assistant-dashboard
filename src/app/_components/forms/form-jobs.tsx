"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Button } from "@components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@components/ui/use-toast";

const applicationFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  resume: z.string().min(1, "Please attach your resume."),
  coverLetter: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export function JobApplicationForm() {
  const { toast } = useToast();
  const formMethods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      resume: "",
      coverLetter: "",
    },
  });

  const { reset, handleSubmit, formState } = formMethods;
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    console.log("Form Data:", data);
    // Simulate a server response delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Application Submitted",
      description:
        "Thank you for applying! One of our recruiters will be in touch soon.",
      variant: "default",
    });

    reset(); // Clear form fields after submission
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <FormProvider {...formMethods}>
        {" "}
        {/* Wrap the form with FormProvider */}
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className=" mx-auto my-8 max-w-3xl space-y-4"
        >
          {/* Full Name Field */}
          <FormField
            control={formMethods.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your full name" />
                </FormControl>
                <FormMessage>
                  {fieldState.error ? fieldState.error.message : ""}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={formMethods.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="email@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage>
                  {fieldState.error ? fieldState.error.message : ""}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Resume Upload */}
          <FormField
            control={formMethods.control}
            name="resume"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>
                <FormMessage>
                  {fieldState.error ? fieldState.error.message : ""}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Cover Letter (Optional) */}
          <FormField
            control={formMethods.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Cover letter" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit Application</Button>
        </form>
      </FormProvider>
    </div>
  );
}
