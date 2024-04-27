import { load } from "outstatic/server";

import GenericHero from "@marketing/components/hero/hero-generic";
import JobsSectionsContainer from "@marketing/components/jobs/jobs-grid-container";

export const dynamic = "force-static";

interface Post {
  title: string;
  slug: string;
  publishedAt: Date; // This is a Date object
  category: string;
}

interface PostType {
  title: string;
  slug: string;
  publishedAt: string; // This needs to be a string
  category: string;
}

export default async function JobsPage() {
  const { find } = await load();

  // Define categories to fetch
  const categories = ["Engineering", "Product", "Revenue"];

  // Fetch posts for each category and combine them into one array
  let allPosts: PostType[] = [];
  for (const category of categories) {
    const categoryPosts = (await find({
      category: category,
    })
      .project({ title: 1, slug: 1, publishedAt: 1, category: 1 })
      .toArray()) as unknown as Post[];

    // Convert Date to string format before passing to JobsSectionsContainer
    const formattedPosts: PostType[] = categoryPosts.map((post) => ({
      ...post,
      publishedAt: post.publishedAt.toISOString(), // Convert Date to ISO string format
    }));

    allPosts = [...allPosts, ...formattedPosts];
  }

  return (
    <div className="container">
      <GenericHero
        title="Join Our Team"
        description="We're always looking for talented individuals to join our team. Check out our open positions below."
      />
      <JobsSectionsContainer posts={allPosts} />
    </div>
  );
}