import { getDocumentSlugs, getDocumentBySlug } from "outstatic/server";
import matter from 'gray-matter';
import path from 'path';
import { promises as fs } from 'fs';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = getDocumentSlugs("blog");
  console.log(posts);
  return posts.map((slug) => ({ slug }));
}



export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Construct the full path to the markdown file
  const filePath = path.join(process.cwd(), 'outstatic', 'content', 'blog', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');

  // Parse the markdown file content
  const { data: frontMatter, content } = matter(fileContents);

  // Here, you can convert `content` from markdown to HTML as needed

  return (
    <div>
      <h1>{frontMatter.title}</h1>
      {/* Render the markdown content as HTML */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}