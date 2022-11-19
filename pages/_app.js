import '../styles/globals.css';
import Layout from './../components/Layout';
import { BookmarksProvider } from './../contexts/BookmarksContext';

function MyApp({ Component, pageProps }) {
  return (
    <BookmarksProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BookmarksProvider>
  );
}

export default MyApp;
