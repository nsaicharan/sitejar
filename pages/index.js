import { auth } from './../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Bookmarks from '../components/Bookmarks';
import FrontIntro from '../components/FrontIntro';

export default function Home() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {!user && !loading && <FrontIntro />}
      {user && <Bookmarks />}
    </>
  );
}
