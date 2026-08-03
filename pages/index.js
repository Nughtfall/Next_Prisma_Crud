import Link from 'next/link';
import prisma from '../lib/prisma';

export async function getServerSideProps() {
  if (!process.env.DATABASE_URL) {
    return {
      props: {
        posts: [],
        dbNotConfigured: true,
      },
    };
  }

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { id: 'desc' },
    include: {
      comments: {
        select: { content: true },
      },
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      dbNotConfigured: false,
    },
  };
}

export default function HomePage({
  posts = [],
  dbNotConfigured = false,
}) {
  return (
    <div>
      <h2 className="page-title">Posts</h2>

      {dbNotConfigured ? (
        <div className="card">
          Database not configured.
        </div>
      ) : posts.length === 0 ? (
        <div className="card">
          No published posts yet.
        </div>
      ) : (
        posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="card-link"
          >
            <div className="card">
              <h3>{post.title}</h3>

              <p>
                <strong>Content:</strong> {post.content}
              </p>

              <p className="card-meta">
                {post.comments.length} comments
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
