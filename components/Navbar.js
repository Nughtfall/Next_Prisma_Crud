import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        Posts App
      </Link>
      <div className="nav-links">
        <Link href="/">Posts</Link>
        <Link href="/drafts">Drafts</Link>
        <Link href="/posts/create">Add Post</Link>
      </div>
    </nav>
  );
}
