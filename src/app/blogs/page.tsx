import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import contentfulClient from "src/lib/contentful";

import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface BlogPostFields {
  title: string;
  slug?: string;
  introduction: Document;
  firstSection: Document;
  secondSection: Document;
  thirdSection?: string;
  conclusion: Document;
  callToAction: Document;
}

export type BlogPost = Entry<BlogPostFields>;

export default async function BlogPage() {
  const posts = await contentfulClient.getEntries<BlogPost>({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.items.map((post) => (
        <div key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          {documentToReactComponents(post.fields.introduction)}
          <a href={`/blogs/${post.fields.slug}`}>Read more</a>
        </div>
      ))}
    </div>
  );
}
