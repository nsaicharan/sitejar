import Head from 'next/head';
import Header from './../components/Header';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Webmark</title>
        <meta name="description" content="Bookmark pages for later reference" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
}
