import { useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { SignUp } from '@templates';

import { auth } from '@config';

import { useWindowSize } from '@hooks';

export default function SignupPage() {
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
      <SignUp />
    </main>
  );
}
