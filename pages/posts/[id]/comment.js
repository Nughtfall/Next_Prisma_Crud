import { useState } from "react";
import { useRouter } from "next/router";

export default function AddComment() {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!router.isReady) {
    return <p>Loading...</p>;
  }

  async function submitComment(e) {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please enter a comment.");
      return;
    }

    if (!id) {
      alert("Post ID is missing.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          content: content.trim(),
        }),
      });

      if (res.ok) {
        router.push(`/posts/${id}`);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add comment.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add comment.");
    }

    setLoading(false);
  }

  return (
    <div className="card">
      <h2>Add Comment</h2>

      <form onSubmit={submitComment}>
        <textarea
          rows={5}
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
}
