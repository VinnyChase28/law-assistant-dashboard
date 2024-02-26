"use client";

import { useEffect } from "react";
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
import { useToast } from "../_components/ui/use-toast";
import { Label } from "../_components/ui/label";

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

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  // Mutations
  const updateName = api.user.updateName.useMutation();
  const updateBio = api.user.updateBio.useMutation();
  const addSocialLink = api.user.addSocialLink.useMutation();

  if (isUserDataLoading || !userData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  async function onSubmit(data: ProfileFormValues) {
    console.log(data, "data send to onSubmit");
    try {
      // Update user's name
      await updateName.mutateAsync({ name: data.name });

      // Update user's bio
      await updateBio.mutateAsync({ bio: data.bio });

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
  }

  return (
    <div>
      <Label>Email</Label>
      <p className="pb-6">{userData?.email ?? "Loading..."}</p>
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
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
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
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
