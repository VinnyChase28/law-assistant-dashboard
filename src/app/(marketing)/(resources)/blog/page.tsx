import { getDocuments } from "outstatic/server";

import BlogGridContainer from "@marketing/components/blog/blog-grid-container";
import BlogHero from "@marketing/components/blog/blog-hero";

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getDocuments("blog", ["title", "slug", "publishedAt"]);

  return (
    <div className="container mx-auto px-4">
      <BlogHero />
      <BlogGridContainer posts={posts} />
    </div>
  );
}
