import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import BlogGridContainer from "./components/blog-grid-container";

// Define the type for your post metadata
type PostMetadata = {
  title: string;
  slug: string;
  publishedAt: string;
};

export default async function BlogPage() {
  try {
    // Construct the directory path where the Markdown files are stored
    const postsDirectory = path.join(
      process.cwd(),
      "outstatic",
      "content",
      "blog",
    );

    // Read the names of all files in the directory
    let filenames = await fs.readdir(postsDirectory);

    // Filter out non-Markdown files
    filenames = filenames.filter((filename) => filename.endsWith(".md"));

    // Read and parse each Markdown file to extract the metadata
    const posts = await Promise.all(
      filenames.map(async (filename) => {
        // Construct the full path for each file
        const filePath = path.join(postsDirectory, filename);
        // Read the file contents
        const fileContents = await fs.readFile(filePath, "utf8");
        // Parse the front matter from the file contents
        const { data } = matter(fileContents);

        // Return the metadata for each post
        return {
          title: data.title,
          slug: filename.replace(/\.md$/, ""), // Remove the file extension to get the slug
          publishedAt: data.publishedAt,
        } as PostMetadata;
      }),
    );

    // Sort posts by publishedAt date
    posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return (
      <div className="container mx-auto px-4">
        <BlogGridContainer posts={posts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return <div>Failed to load the blog posts.</div>;
  }
}
