import { useRouter } from 'next/router';

export const Chat = () => {
  const router = useRouter();

  return (
    <>
      <div className='bg-primary-100 center h-[50%] px-[50px]'>
        <div
          className='border-primary-bg w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'
          onClick={() => router.push('/chat/new')}>
          <div className='text-AX1-Subhead'>Continue with</div>
          <div className='text-AX1-Subhead rounded-[50px]'>Last Conversation</div>
        </div>
      </div>
      <div
        className='bg-primary-bg center h-[50%] border-t-[2px] border-t-black px-[50px]'
        onClick={() => router.push('/chat/last')}>
        <div className='border-primary-100 w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'>
          <div className='text-AX1-Subhead'>Start</div>
          <div className='text-AX1-Subhead rounded-[50px]'>New Conversation</div>
        </div>
      </div>
    </>
  );
};
