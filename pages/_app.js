import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { BookmarksProvider } from '../contexts/BookmarksContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <BookmarksProvider>
        <Component {...pageProps} />
      </BookmarksProvider>
    </SessionProvider>
  );
}

export default MyApp;
