import { useEffect, useState } from 'react';

import { useWindowSize } from '@util';
import { onAuthStateChanged } from 'firebase/auth';

import { BottomNavbar, Loading } from '@components';
import { Entry } from '@templates';

import { auth } from '@config';

export default function HomePage() {
  const { height } = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoading(false);
        setIsLoggedIn(true);
        return;
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <main style={{ height }}>
        {isLoggedIn ? <div className='text-AX5-Headline'>Docs</div> : <Entry />}
      </main>
      {isLoggedIn && <BottomNavbar />}
    </>
  );
}
