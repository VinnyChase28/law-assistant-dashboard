"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "src/trpc/react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const labelFormSchema = z.object({
  labels: z.array(
    z.object({
      name: z
        .string()
        .min(1, "Label must not be empty.")
        .max(10, "Label must not be longer than 10 characters."),
    }),
  ),
});

type LabelFormValues = z.infer<typeof labelFormSchema>;

export function LabelForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: {
      labels: [{ name: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "labels",
    control: form.control,
  });

  const createLabel = api.file.createLabel.useMutation();

  async function onSubmit(data: LabelFormValues) {
    setIsSubmitting(true);

    try {
      for (const label of data.labels) {
        await createLabel.mutateAsync({ text: label.name });
      }

      toast({
        title: "Labels created successfully",
      });
    } catch (error) {
      toast({
        title: "Error creating labels",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }

    setIsSubmitting(false);
  }

  return (
    <div className="w-full">
      <Label>Create New Labels</Label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full content-center  space-x-2"
            >
              <FormItem className="flex-1">
                <FormLabel>Label {index + 1}</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter label"
                    {...form.register(`labels.${index}.name`)}
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center justify-center p-1 pt-8 text-gray-500 hover:text-gray-700" // Added padding to ensure the button is a square, which might help with alignment
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-full sm:w-auto"
            onClick={() => append({ name: "" })}
          >
            Add Label
          </Button>
          <Button
            variant="default"
            disabled={isSubmitting}
            type="submit"
            className="w-full sm:w-auto"
          >
            Create Labels
          </Button>
        </form>
      </Form>
    </div>
  );
}
