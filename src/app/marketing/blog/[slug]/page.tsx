import { getDocumentSlugs, getDocumentBySlug } from "outstatic/server";

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = getDocumentSlugs("blog");
  console.log(posts);
  return posts.map((slug) => ({ slug }));
}
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log(slug);
  const post = await getDocumentBySlug('blog', params.slug, [
    'title',
    'author',
    'content',
    'coverImage',
    'publishedAt',
  ]);
  console.log(post);

  return (
    <div>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
    </div>
  );

  
}
