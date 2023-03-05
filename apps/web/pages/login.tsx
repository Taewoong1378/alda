import { useEffect } from 'react';

import { useWindowSize } from '@util';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { Login } from '@templates';

import { auth } from '@config';

export default function LoginPage() {
  const { height } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push('/');
        return;
      }
    });
  }, []);

  return (
    <main style={{ height }}>
      <Login />
    </main>
  );
}
