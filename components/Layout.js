import Header from './Header';
import Head from 'next/head';

function Layout({ children }) {
  return (
    <div className="container mx-auto px-5 min-h-screen flex flex-col text-slate-700">
      <Head>
        <title>Webmark</title>
      </Head>

      <Header />

      <main className="flex-1 flex">{children}</main>
    </div>
  );
}

export default Layout;
