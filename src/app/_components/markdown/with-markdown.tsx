import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import Markdown from "src/app/_components/markdown"; // Adjust path as necessary

// This higher-order function returns a page component for a given collection and slug
export function withMarkdown(collection: string) {
  return async function MarkdownPage({ slug }: { slug: string }) {
    // Define the path to the Markdown file
    const filePath = path.join(
      process.cwd(),
      "outstatic",
      "content",
      collection,
      `${slug}.md`,
    );

    // Read the Markdown file
    const fileContents = await fs.readFile(filePath, "utf8");

    // Use gray-matter to parse the front matter section
    const { data: frontMatter, content } = matter(fileContents);

    // Render the content using a Markdown component
    return (
      <div className="container mx-auto px-4 pt-20">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-center text-3xl">{frontMatter.title}</h1>
          <Markdown markdownText={content} />
        </article>
      </div>
    );
  };
}
