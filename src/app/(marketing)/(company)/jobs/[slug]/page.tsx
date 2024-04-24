import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";
import { getDocumentSlugs } from "outstatic/server";

import { JobApplicationForm } from "@components/forms/form-jobs";
import ImageContainer from "@components/image/image-container";
import Markdown from "@components/markdown";
import { Separator } from "@components/ui/separator";
import ProgressAnimations from "@marketing/components/animations/progress-animation";


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "jobs",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data: frontMatter } = matter(fileContents);

  // Return a metadata object with dynamic values based on the blog post content
  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      images: [
        {
          url: frontMatter.coverImage,
          alt: frontMatter.title,
        },
      ],
    },
    // Add any other metadata fields as needed
  };
}

export async function generateStaticParams() {
  const jobs = getDocumentSlugs("jobs");
  return jobs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "jobs",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data: frontMatter, content } = matter(fileContents);

  return (
    <>
      <ProgressAnimations />
      <div className="container mx-auto px-4 py-10">
        <article className="mx-auto my-8 max-w-3xl">
          {frontMatter?.coverImage && (
            <div className="relative mb-8 aspect-video">
              <ImageContainer
                src={frontMatter.coverImage}
                alt={frontMatter.title}
                width={1200}
                height={630}
              />
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold">{frontMatter?.title}</h1>
          <div className="mb-8 text-gray-500">
            Published on{" "}
            {frontMatter?.publishedAt
              ? new Date(frontMatter.publishedAt).toLocaleDateString()
              : "N/A"}
          </div>
          <Markdown markdownText={content ?? ""} />
        </article>
        <Separator />
        <div className="mt-8">
          <JobApplicationForm />
        </div>
      </div>
    </>
  );
}
