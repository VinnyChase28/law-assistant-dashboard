import { getDocumentBySlug } from "outstatic/server";
import { notFound } from "next/navigation";
import Markdown from "src/app/_components/markdown";

export async function generateStaticParams() {
  const posts = await getDocuments("blog", ["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function BlogPostPage({ params }) {
  const post = await getDocumentBySlug("blog", params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <Markdown markdownText={post.content} />
    </div>
  );
}

export default BlogPostPage;
