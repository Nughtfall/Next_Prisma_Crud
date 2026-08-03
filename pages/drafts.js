import { useState } from 'react';
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';

export async function getServerSideProps() {
  if (!process.env.DATABASE_URL) {
    return {
      props: {
        drafts: [],
        dbNotConfigured: true,
      },
    };
  }

  const drafts = await prisma.post.findMany({
    where: { published: false },
    orderBy: { id: 'desc' },
  });

  return {
    props: {
      drafts: JSON.parse(JSON.stringify(drafts)),
      dbNotConfigured: false, // <-- Pass false when database is configured
    },
  };
}

// Destructure dbNotConfigured with a default fallback value
export default function DraftsPage({ drafts = [], dbNotConfigured = false }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePublish(id) {
    setLoading(true);
    await fetch(`/api/publish/${id}`, { method: 'PUT' });
    setLoading(false);
    router.push('/');
  }

  return (
    <div>
      <h2>Drafts</h2>
      {dbNotConfigured ? (
        <div className="card">Database not configured. Set DATABASE_URL in Vercel env vars.</div>
      ) : drafts.length === 0 ? (
        <div className="card">No drafts yet.</div>
      ) : (
        drafts.map((post) => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="button-row">
              <button className="button" disabled={loading} onClick={() => handlePublish(post.id)}>
                {loading ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
