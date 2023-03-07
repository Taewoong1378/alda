import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '@config';

import { useGetProfile } from '@hooks';

export const Settings = () => {
  const { resetUser } = useGetProfile();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth).then(() => {
      resetUser();
    });
    router.replace('/');
  };

  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Settings Page</h1>
      <button onClick={logout}>로그아웃</button>
    </main>
  );
};
