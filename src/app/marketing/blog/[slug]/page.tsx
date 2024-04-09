import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import BlogAnimations from "../components/blog-animations";
import Markdown from "src/app/_components/markdown";
import Image from "next/image";

// Define the type for your post
type BlogPost = {
  title: string;
  content: string;
  publishedAt: string;
  coverImage: string;
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {

  try {
    // Construct the file path
    const filePath = path.join(
      process.cwd(),
      "outstatic",
      "content",
      "blog",
      `${params.slug}.md`,
    );

    // Read the file contents
    const fileContents = await fs.readFile(filePath, "utf8");

    // Parse the file contents
    const { data, content } = matter(fileContents);

    // Construct the post object
    const post: BlogPost = {
      title: data.title,
      content: content,
      publishedAt: data.publishedAt,
      coverImage: data.coverImage,
    };
    return (
      <BlogAnimations>
        <div className="container mx-auto px-4 py-10">
          <article className="mx-auto my-8 max-w-3xl">
            {post?.coverImage && (
              <div className="relative mb-8 aspect-video">
                <Image
                  src={post.coverImage}
                  alt={post?.title || "Blog post cover image"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
            )}
            <h1 className="mb-4 text-4xl font-bold">{post?.title}</h1>
            <div className="mb-8 text-gray-500">
              Published on{" "}
              {post?.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : "N/A"}
            </div>
            <Markdown markdownText={post?.content ?? ""} />
          </article>
        </div>
      </BlogAnimations>
    );
  } catch (error) {
    console.error(`Error fetching blog post with slug ${params.slug}:`, error);
    return <div>Failed to load the blog post.</div>;
  }
}
