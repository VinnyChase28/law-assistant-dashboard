import { getDocuments } from "outstatic/server";

export default async function BlogPage() {
  const posts = await getDocuments("blog", ["title", "slug", "publishedAt"]);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
