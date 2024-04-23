import { load } from "outstatic/server";

import GenericHero from "@marketing/components/hero/hero-generic";
import JobsSectionsContainer from "@marketing/components/jobs/jobs-grid-container";

export const dynamic = "force-static";

export default async function JobsPage() {
  const { find } = await load();

  // Define categories to fetch
  const categories = ["Engineering", "Product", "Revenue"];

  // Fetch posts for each category and combine them into one array
  let allPosts: any = [];
  for (const category of categories) {
    const categoryPosts = await find({
      category: category, // Assuming 'category' is the field name in your schema
    })
      .project(["title", "slug", "publishedAt", "category"])
      .toArray();

    allPosts = [...allPosts, ...categoryPosts];
  }

  return (
    <div className="container mx-auto px-4">
      <GenericHero
        title="Join Our Team"
        description="We are always looking for talented individuals to join our team. Check out our open positions below."
      />
      <JobsSectionsContainer posts={allPosts} />
    </div>
  );
}
