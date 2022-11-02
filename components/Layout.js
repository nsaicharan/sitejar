import Header from './Header';
import Head from 'next/head';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col text-slate-700">
      <Head>
        <title>Webmark</title>
      </Head>

      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto my-12 px-5 flex">
        {children}
      </main>
    </div>
  );
}

export default Layout;
