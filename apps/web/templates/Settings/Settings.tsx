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
    <main className='flex h-screen flex-col justify-center'>
      <div className='h-100' />
      <div className='bg-primary-100 pl-35 h-full w-[70%] rounded-tr-[50px] bg-opacity-50 pt-12'>
        <div className='text-[14px] font-bold'>account settings</div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </main>
  );
};
