import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { Login } from '@templates';

import { auth } from '@config';

import { useWindowSize } from '@hooks';

export default function LoginPage() {
  const router = useRouter();
  const { height } = useWindowSize();

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
