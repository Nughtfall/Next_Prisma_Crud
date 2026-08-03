import { useState } from 'react';
import Link from 'next/link';
import prisma from '../../../lib/prisma';

export async function getServerSideProps({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      comments: true,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
}

export default function PostPage({ post }) {
  const [comments] = useState(post.comments || []);

  return (
    <>
      <div className="card">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </div>

      <div className="comment-section card">
        <h3>Comments ({comments.length})</h3>

        {comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-card">
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to add one.</p>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Link
            href={`/posts/${post.id}/comment`}
            className="button"
            style={{
              background: '#111827',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Add Comment
          </Link>
        </div>
      </div>
    </>
  );
}

