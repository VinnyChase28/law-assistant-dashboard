import { MetadataRoute } from "next";
import { promises as fs } from "fs";

import path from "path";

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
      url: `https://lawassistant.ai/marketing/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostUrls = await getBlogPostUrls();
  return [
    {
      url: "https://lawassistant.ai",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://lawassistant.ai/marketing/platform/overview",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/marketing/platform/how-it-works",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/marketing/platform/why-codex",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lawassistant.ai/marketing/platform/integrations",
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
    ...blogPostUrls,
  ];
}
