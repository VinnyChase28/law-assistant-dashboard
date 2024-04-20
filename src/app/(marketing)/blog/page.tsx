import { getDocuments } from "outstatic/server";

import BlogGridContainer from "./components/blog-grid-container";

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getDocuments("blog", ["title", "slug", "publishedAt"]);

  return (
    <div className="container mx-auto px-4">
      <BlogGridContainer posts={posts} />
    </div>
  );
}
