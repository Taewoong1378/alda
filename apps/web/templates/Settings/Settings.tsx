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
      <div className='bg-primary-100 h-full w-[70%] rounded-tr-[50px] bg-opacity-50 pt-12'>
        <div className='pl-35 text-[14px] font-bold'>notice board</div>
        <div className='pl-35 mt-32 cursor-pointer' onClick={() => alert('Preparing')}>
          Announcement
        </div>
        <div className='pl-35 mt-15 cursor-pointer' onClick={() => alert('Preparing')}>
          Q & A
        </div>
        <div className='pl-35 mt-15 cursor-pointer' onClick={() => alert('Preparing')}>
          Send feedback
        </div>

        <div className='bg-primary-100 mt-25 h-8 w-full bg-opacity-50' />
        <div className='pl-35 mt-12 text-[14px] font-bold'>account settings</div>
        <button className='pl-35 mt-32 cursor-pointer' onClick={() => router.push('/information')}>
          My Information
        </button>

        <div className='bg-primary-100 mt-25 h-8 w-full bg-opacity-50' />
        {/* <div className='pl-35 text-secondary-101 mt-12 text-[14px] font-bold'>
          withdrawal from service
        </div> */}
        <div className='pl-35 text-secondary-101 mt-12 text-[14px] font-bold' onClick={logout}>
          log out
        </div>
      </div>
      <div className='left-35 absolute bottom-[120px] text-[14px] font-bold'>version 1.0</div>
    </main>
  );
};
