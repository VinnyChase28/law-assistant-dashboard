import { getDocumentSlugs, getDocumentBySlug } from "outstatic/server";
import matter from 'gray-matter';
import path from 'path';
import { promises as fs } from 'fs';
import Markdown from "src/app/_components/markdown";
import Image
 from "next/image";
import BlogAnimations from "../components/blog-animations";

export async function generateStaticParams() {
  const posts = getDocumentSlugs("blog");
  console.log(posts);
  return posts.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'outstatic', 'content', 'blog', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);

  return (
    <BlogAnimations>
        <div className="container mx-auto px-4 py-10">
          <article className="mx-auto my-8 max-w-3xl">
            {frontMatter?.coverImage && (
              <div className="relative mb-8 aspect-video">
                <Image
                  src={frontMatter.coverImage}
                  alt={frontMatter?.title || "Blog post cover image"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
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
        </div>
      </BlogAnimations>
  );
}
