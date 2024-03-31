import typebloggg
import contentfulClient from "./contentfulClient";

export interface BlogPost {
  title: string;
  slug: string;
  body: RichTextDocument | null;
  image: ContentImage | null;
}

export function parseContentfulBlogPost(
  blogPostEntry?: BlogPostEntry,
): BlogPost | null {
  // Transform Contentful blog post to BlogPost object
}

export async function fetchBlogPosts({ preview }: FetchBlogPostsOptions) {
  // Fetch all blog posts
}

export async function fetchBlogPost({ slug, preview }: FetchBlogPostOptions) {
  // Fetch single blog post by slug
}
