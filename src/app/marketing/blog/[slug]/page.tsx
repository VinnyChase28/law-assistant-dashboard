import { getDocumentBySlug, getDocumentPaths } from "outstatic/server";
import { remark } from "remark";
import html from "remark-html";
import BlogAnimations from "../blog-animations";
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getDocumentBySlug("blog", params.slug, [
    "title",
    "content",
    "publishedAt",
  ]);

  const contentHtml = (
    await remark().use(html).process(post?.content)
  ).toString();

  return (
    <BlogAnimations>
      <div className="container mx-auto px-4">
        <article className="mx-auto my-8 max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">{post?.title}</h1>
          <div className="mb-8 text-gray-500">
            Published on{" "}
            {post?.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : "N/A"}
          </div>
          <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </div>
    </BlogAnimations>
  );
}

export async function generateStaticParams() {
  return getDocumentPaths("blog");
}
