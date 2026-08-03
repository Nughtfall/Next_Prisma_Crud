import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Posts App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="page-shell">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>
    </>
  );
}

