import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { BottomNavbar, Loading } from '@components';
import { Entry, Home } from '@templates';

import { auth } from '@config';

import { useWindowSize } from '@hooks';

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
      <main style={{ height }}>{isLoggedIn ? <Home /> : <Entry />}</main>
      {isLoggedIn && <BottomNavbar />}
    </>
  );
}
