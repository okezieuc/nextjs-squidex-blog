import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fetchAPI from "../lib/squidex";

export default function BlogPost({ post, source }) {
  return (
    <div>
      <h1 className="blog-post-title">{post.title}</h1>
      <MDXRemote {...source} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await fetchAPI(
    `
    query QueryPosts($query: String!) {
          queryPostsContents(filter: $query) {
              id
              flatData {
                  title
                  content
              }
          }
      }
    `,
    {
      variables: {
        query: `data/Slug/iv eq '${params.slug}'`,
      },
    }
  );

  if (data.queryPostsContents.length === 0) {
    return {
      notFound: true,
    };
  }
  const post = data.queryPostsContents[0].flatData;

  const mdxSource = await serialize(post.content);

  return {
    props: {
      post: post,
      source: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetchAPI(`
    {
      queryPostsContents {
        id,
        flatData {
          slug
        }
      }
    }
    `);

  return {
    paths: data.queryPostsContents.map((post) => {
      return {
        params: {
          slug: post.flatData.slug,
        },
      };
    }),
    fallback: false,
  };
}
