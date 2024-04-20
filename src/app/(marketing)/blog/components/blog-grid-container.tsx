"use client";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "src/app/_components/ui/button";

const cardVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 },
};

type BlogGridContainerProps = {
  posts: {
    title: string;
    slug: string;
    publishedAt: string;
  }[];
};

export default function BlogGridContainer({ posts }: BlogGridContainerProps) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-8 p-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="h-50 relative w-full overflow-hidden rounded-lg" // Ensure overflow is hidden and rounded corners
        >
          {/* Card content */}
          <Card className="relative z-10 flex h-full flex-col rounded-lg">
            {" "}
            {/* Adjust background and rounding */}
            <CardHeader>
              <CardTitle>{post.title}</CardTitle> {/* Adjust text color */}
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>
                Published on {new Date(post.publishedAt).toLocaleDateString()}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <a href={`/blog/${post.slug}`}>Read More</a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
