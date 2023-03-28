import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';

function Layout({ user, children }) {
  const router = useRouter();

  async function handleAuth() {
    if (user) {
      signOut({ redirect: false });
      router.push('/');
    } else {
      signIn('google');
    }
  }

  return (
    <div className="min-h-screen flex flex-col text-slate-700">
      <Head>
        <title>Sitejar</title>
      </Head>

      <header className="py-3 shadow-sm border-b border-slate-900/10">
        <nav className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          <Link href="/" className="text-2xl text-slate-900">
            Sitejar
          </Link>

          <div className="flex gap-4 md:gap-5">
            {user && router.pathname !== '/add' && (
              <Link
                href="/add"
                className="py-2 px-3 rounded text-sm text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200 md:px-4 md:text-base"
              >
                Add <span className="sr-only md:not-sr-only">a bookmark</span>
              </Link>
            )}

            <button
              className="flex py-2 px-3 rounded text-sm text-indigo-600 border border-indigo-600 outline-none focus:ring focus:ring-indigo-200 md:px-4 md:text-base"
              onClick={handleAuth}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto my-12 px-5 flex">
        {children}
      </main>
    </div>
  );
}

export default Layout;
