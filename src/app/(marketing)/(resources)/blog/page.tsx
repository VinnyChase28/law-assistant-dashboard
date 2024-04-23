import { getDocuments } from "outstatic/server";

import BlogGridContainer from "@marketing/components/blog/grid-container-blog";

import GenericHero from "../../_components/hero/hero-generic";

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getDocuments("blog", ["title", "slug", "publishedAt"]);

  return (
    <div className="container mx-auto px-4">
      <GenericHero
        title="News"
        description="Join us on a journey through the compliance world, and get insights
          into the latest automation trends."
      />
      <BlogGridContainer posts={posts} />
    </div>
  );
}
