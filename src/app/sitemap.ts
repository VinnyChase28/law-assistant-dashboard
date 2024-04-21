import { promises as fs } from "fs";
import path from "path";

import { type MetadataRoute } from "next";

async function getBlogPostUrls(): Promise<
  Array<{
    url: string;
    lastModified: Date;
    changeFrequency:
      | "weekly"
      | "daily"
      | "always"
      | "hourly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }>
> {
  const blogDirectory = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "blog",
  );
  const filenames = await fs.readdir(blogDirectory);
  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, ""); // Correctly define 'slug' here
    return {
      url: `https://lawassistant.ai/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });
}

//so the same as /blog but for /jobs

async function getJobPostUrls(): Promise<
  Array<{
    url: string;
    lastModified: Date;
    changeFrequency:
      | "weekly"
      | "daily"
      | "always"
      | "hourly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }>
> {
  const jobDirectory = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "jobs",
  );
  const filenames = await fs.readdir(jobDirectory);
  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, ""); // Correctly define 'slug' here
    return {
      url: `https://lawassistant.ai/jobs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostUrls = await getBlogPostUrls();
  const jobPostUrls = await getJobPostUrls();
  return [
    {
      url: "https://lawassistant.ai",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://lawassistant.ai/overview",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/how-it-works",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/why-codex",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/integrations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/terms-of-use",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Adding use case pages with priority 0.8
    {
      url: "https://lawassistant.ai/contracts",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lawassistant.ai/environmental",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lawassistant.ai/financial",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lawassistant.ai/hr-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lawassistant.ai/real-estate",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lawassistant.ai/software",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogPostUrls,
    ...jobPostUrls,
  ];
}
