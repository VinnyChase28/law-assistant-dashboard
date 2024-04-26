"use client";

import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@components/ui/button";
import { Form, FormControl, FormItem } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { useToast } from "@components/ui/use-toast";
import { api } from "src/trpc/react";

import LabelActionsDropdown from "./label-actions";

const labelFormSchema = z.object({
  labels: z.array(
    z.object({
      name: z
        .string()
        .min(1, "Label must not be empty.")
        .max(20, "Label must not be longer than 20 characters."),
    }),
  ),
});

type LabelFormValues = z.infer<typeof labelFormSchema>;

export function LabelForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedLabels, setSavedLabels] = useState<
    { id: string; name: string }[]
  >([]);

  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: { labels: [{ name: "" }] },
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "labels",
    control: form.control,
  });

  const createLabel = api.file.createLabel.useMutation();
  const {
    data: labels,
    isLoading: isLoadingLabels,
    refetch,
  } = api.file.getLabels.useQuery();

  async function onSubmit(data: LabelFormValues) {
    setIsSubmitting(true);
    try {
      for (const label of data.labels) {
        await createLabel.mutateAsync({ text: label.name });
      }
      await refetch();
      toast({ title: "Labels created successfully" });
      form.reset({ labels: [{ name: "" }] });
    } catch (error) {
      toast({
        title: "Error creating labels",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (labels) {
      setSavedLabels(
        labels.map((label) => ({ id: label.id, name: label.text })),
      );
    }
  }, [labels]);

  return (
    <div className="w-full">
      {isLoadingLabels ? (
        <div>Loading labels...</div>
      ) : (
        <div className=" pb-4">
          <Label>Saved Labels</Label>
          {savedLabels.map((label) => (
            <div key={label.id} className="mt-2 flex items-center space-x-2">
              <Input
                className="flex-1 cursor-not-allowed"
                value={label.name}
                readOnly
                disabled
              />
              <LabelActionsDropdown
                labelId={label.id}
                onDeleted={() =>
                  setSavedLabels((prev) =>
                    prev.filter((l) => l.id !== label.id),
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
      <Separator />
      <div className="pt-4" />
      <Label>Create New Labels</Label>
      <div className="pt-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full content-center space-x-2"
            >
              <FormItem className="flex-1">
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter label"
                    {...form.register(`labels.${index}.name`)}
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2 w-full pr-3 sm:w-auto"
            onClick={() => append({ name: "" })}
          >
            Add
          </Button>
          <Button
            variant="secondary"
            disabled={isSubmitting}
            type="submit"
            className="w-full pl-4 sm:w-auto"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}