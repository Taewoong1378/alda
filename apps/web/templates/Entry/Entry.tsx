import { useRouter } from 'next/router';

export const Entry = () => {
  const router = useRouter();

  return (
    <>
      <div className='center bg-primary-100 h-[50%]'>
        <button
          className='text-AX4-Headline h-[220px] w-[220px] rounded-full border-[2px] border-black bg-[rgba(255,255,255,0.2)] backdrop-blur-[2px] backdrop-filter'
          onClick={() => router.push('/login')}>
          Log in
        </button>
      </div>
      <div className='center bg-primary-200 h-[50%]'>
        <button
          className='text-AX4-Headline border-primary-bg h-[220px] w-[220px] rounded-full border-[2px] bg-[rgba(255,255,255,0.2)] text-white backdrop-blur-[2px] backdrop-filter'
          onClick={() => router.push('/signup')}>
          Sign up
        </button>
      </div>
    </>
  );
};
