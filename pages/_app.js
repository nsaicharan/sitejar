import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { BookmarksProvider } from '../contexts/BookmarksContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <BookmarksProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookmarksProvider>
    </SessionProvider>
  );
}

export default MyApp;
