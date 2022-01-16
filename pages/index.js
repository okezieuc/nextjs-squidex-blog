import Head from "next/head";
import fetchAPI from "../lib/squidex";
import BlogItem from "../components/blogItem";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="blog-post-list">
        {posts.map((post) => (
          <BlogItem
            title={post.flatData.title}
            slug={post.flatData.slug}
            key={post.id}
          />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetchAPI(`
  {
    queryPostsContents {
      id,
      flatData {
        title,
        slug,
      }
    }
  }
  `);
  return {
    props: {
      posts: data.queryPostsContents,
    },
  };
}
