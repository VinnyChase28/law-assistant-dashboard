"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "src/trpc/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { SkeletonAbstract } from "@/components/skeleton-abstract";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch user details
  const { data: userData, isLoading: isUserDataLoading } =
    api.user.getUserDetails.useQuery();
  const { data: socialLinks, isLoading: isSocialLinksLoading } =
    api.user.getSocialLinks.useQuery();

  // Initialize the form outside the conditional rendering block
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "", // Initial placeholder values
      bio: "",
      urls: [],
    },
    mode: "onChange",
  });

  const {
    formState: { isDirty },
  } = form;

  // useEffect to update form values once userData and socialLinks are loaded
  useEffect(() => {
    if (!isUserDataLoading && userData) {
      const defaultValues: Partial<ProfileFormValues> = {
        name: userData.name ?? "",
        bio: userData.bio ?? "",
        urls: socialLinks?.map((link) => ({ value: link.url })) ?? [],
      };
      form.reset(defaultValues); // Update form values
    }
  }, [userData, socialLinks, isUserDataLoading, form.reset]);

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  // Mutations
  const updateName = api.user.updateName.useMutation();
  const updateBio = api.user.updateBio.useMutation();
  const addSocialLink = api.user.addSocialLink.useMutation();
  const deleteAllSocialLinks = api.user.deleteAllSocialLinks.useMutation();

  if (isUserDataLoading || !userData) {
    return (
      <div>
        <SkeletonAbstract />
        <SkeletonAbstract />
        <SkeletonAbstract />
        <SkeletonAbstract />
        <SkeletonAbstract />
      </div>
    );
  }

  async function onSubmit(data: ProfileFormValues) {
    //disable submit button
    setIsSubmitting(true);
    try {
      // Update user's name
      await updateName.mutateAsync({ name: data.name });

      // Update user's bio
      await updateBio.mutateAsync({ bio: data.bio });

      // Delete all existing links for the user
      await deleteAllSocialLinks.mutateAsync();

      // Add the new links from the form data
      if (data.urls) {
        for (const link of data.urls) {
          await addSocialLink.mutateAsync({ url: link.value });
        }
      }

      // Show a success message
      toast({
        title: "Profile updated successfully",
        // other toast options
      });
    } catch (error) {
      // Show an error message
      toast({
        title: "Error updating profile",
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
    setIsSubmitting(false);
    form.reset(data);
  }

  return (
    <div>
      <Label>Email</Label>
      <p className="pb-6">{userData?.email}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* chant this to just display the email*/}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role & Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your role, company and experience. This will eventually be shown to other team members."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can eventually <span>@mention</span> other team members to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6">
            <FormLabel className="pb-5">URLs</FormLabel>
            <FormDescription>
              Add your social or business links.
            </FormDescription>
            <br />
            {fields.map((field, index) => (
              <div>
                <br />
                <div
                  key={field.id}
                  className="flex items-center space-x-2"
                  style={{ width: "100%" }}
                >
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`urls.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <br />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>
          <Button
            variant={isDirty ? "default" : "ghost"}
            disabled={!isDirty || isSubmitting}
            type="submit"
          >
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
