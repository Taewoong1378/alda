import { useEffect, useState } from 'react';

import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';

import { BottomNavbar, Loading } from '@components';
import { Entry, Home } from '@templates';

import { auth } from '@config';

import { useWindowSize } from '@hooks';

export default function HomePage() {
  const { height } = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const test = async () => {
    const result = await axios.get('https://rgurdygvq7.execute-api.ap-northeast-2.amazonaws.com');
    console.log('result', result);
  };

  useEffect(() => {
    test();
  }, []);

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
