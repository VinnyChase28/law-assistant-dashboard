import { getDocumentBySlug, getDocumentPaths } from "outstatic/server";
import BlogAnimations from "../components/blog-animations";
import Markdown from "src/app/_components/markdown";
import Image from "next/image";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getDocumentBySlug("blog", params.slug, [
    "title",
    "content",
    "publishedAt",
    "coverImage",
  ]);

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
          <Markdown markdownText={post?.content || ""} />
        </article>
      </div>
    </BlogAnimations>
  );
}

export async function generateStaticParams() {
  return getDocumentPaths("blog");
}