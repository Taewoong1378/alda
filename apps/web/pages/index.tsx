import { useLayoutEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '@config';

export default function HomePage() {
  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) router.push('/login');
    });
  }, []);

  return (
    <main>
      <div className='text-AX5-Headline'>Docs</div>
    </main>
  );
}
