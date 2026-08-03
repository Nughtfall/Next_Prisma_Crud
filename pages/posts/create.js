import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage('Please add both a title and content.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      if (res.ok) {
        router.push('/drafts');
      } else {
        const data = await res.json().catch(() => ({}));
        setMessage(data.message || 'Could not create the post.');
      }
    } catch (error) {
      setMessage('Unable to create the post right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Create Post</h2>
      <p className="helper">Create a draft and publish it later from the drafts view.</p>
      {message ? <div className="status">{message}</div> : null}
      <form onSubmit={handleSubmit} className="form-stack">
        <label>
          <strong>Title</strong>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </label>
        <label>
          <strong>Content</strong>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            required
          />
        </label>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Creating...' : 'Save Draft'}
        </button>
      </form>
    </div>
  );
}
