"use client";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Button } from "src/app/_components/ui/button";

const cardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 },
};

type PostType = {
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
};

type BlogSectionsContainerProps = {
  posts: PostType[];
};

export default function BlogSectionsContainer({
  posts,
}: BlogSectionsContainerProps) {
  // Group posts by category
  const postsByCategory = posts.reduce(
    (acc, post) => {
      const { category } = post;
      acc[category] = acc[category] ?? [];
      acc[category]?.push(post);
      return acc;
    },
    {} as Record<string, PostType[]>,
  );

  // Sort categories by predefined order
  const categoryOrder = ["Engineering", "Product", "Revenue"];
  const sortedCategories = categoryOrder.filter(
    (category) => postsByCategory[category],
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {sortedCategories.map((category) => (
        <section key={category} className="mb-12 last:mb-0">
          <h2 className="mb-6 text-2xl font-bold">{category}</h2>
          <Separator />
          <div className="flex flex-wrap gap-8">
            {postsByCategory[category]?.map((post) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative w-full max-w-sm overflow-hidden rounded-lg pt-6"
              >
                <Card className="flex h-full flex-col rounded-lg shadow-lg">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription>
                      Published on{" "}
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">
                      <a href={`/jobs/${post.slug}`}>Apply</a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
