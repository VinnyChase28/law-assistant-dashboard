import { getDocuments } from "outstatic/server";
import BlogGridContainer from "./components/blog-grid-container";

export default async function BlogPage() {
  const posts = await getDocuments("blog", ["title", "slug", "publishedAt"]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <BlogGridContainer posts={posts} />
    </div>
  );
}