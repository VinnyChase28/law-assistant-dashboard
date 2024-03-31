import Link from "next/link";

export default function BlogPostPreview({ post }: any) {
  return (
    <div>
      <Link href={`/blogs/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.excerpt}</p>
    </div>
  );
}
