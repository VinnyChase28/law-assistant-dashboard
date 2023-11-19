"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 

interface IFormInput {
  documents: FileList;
  projectId: string;
}

const fileSchema = z.object({
  documents: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "At least one file is required.")
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ["application/pdf", "text/plain"].includes(file.type),
        ),
      "Unsupported file type.",
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= 10485760),
      "Each file size should be less than 10MB.",
    ),
  projectId: z.string(),
});

export function DocumentUploadForm() {
  const form = useForm<IFormInput>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      projectId: "", // Default to no project selected
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const files = Array.from(data.documents);
    const projectId = data.projectId;
    files.forEach((file) => {
      // Handle each file upload, processing here
      console.log(file, projectId);
    });
  };

  // Example project data
  const projects = [
    { id: "1", name: "Project A" },
    { id: "2", name: "Project B" } /* ... */,
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documents</FormLabel>
              <FormControl>
                <Input type="file" multiple />
              </FormControl>
              <FormDescription>
                Upload your documents (PDF or TXT, max 10MB each).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <DropdownMenuLabel>Choose</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <FormControl>
                <select {...field}>
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                  <option value="new">New Project</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Upload</Button>
      </form>
    </Form>
  );
}
