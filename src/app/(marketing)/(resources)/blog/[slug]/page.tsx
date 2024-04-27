import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

import ImageContainer from "@/app/_components/image/image-container";
import Markdown from "@components/markdown";
import ProgressAnimations from "@marketing/components/animations/progress-animation";
import { type FrontMatter } from "src/types/font-matter"; // Import the FrontMatter interface

interface Metadata {
  title: string;
  description: string;
  openGraph: {
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "blog",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data } = matter(fileContents);
  const frontMatter = data as FrontMatter; // Use the imported FrontMatter interface

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      images: [
        {
          url: frontMatter.coverImage ?? "",
          alt: frontMatter.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;
  const filePath = path.join(
    process.cwd(),
    "outstatic",
    "content",
    "blog",
    `${slug}.md`,
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as FrontMatter; // Use the imported FrontMatter interface

  return (
    <>
      <ProgressAnimations />
      <div className="container mx-auto px-4 py-10">
        <article className="mx-auto my-8 max-w-3xl">
          {frontMatter.coverImage && (
            <div className="relative mb-8 aspect-video">
              <ImageContainer
                src={frontMatter.coverImage
                  .replace("/public", "")
                  .replace("/images/", "")}
                alt={frontMatter.title || "Blog post cover image"}
                width={1920}
                height={500}
              />
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold">{frontMatter.title}</h1>
          <div className="mb-8 text-gray-500">
            Published on{" "}
            {frontMatter.publishedAt
              ? new Date(frontMatter.publishedAt).toLocaleDateString()
              : "N/A"}
          </div>
          <Markdown markdownText={content} />
        </article>
      </div>
    </>
  );
}