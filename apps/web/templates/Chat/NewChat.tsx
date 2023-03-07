import { useRouter } from 'next/router';

import { Icon } from '@components';

export const NewChat = () => {
  const router = useRouter();

  return (
    <>
      <div className='left-30 top-25 absolute cursor-pointer' onClick={() => router.back()}>
        <Icon icon='LeftDirection' size={25} color='primary-bg' />
      </div>
      <div className='right-30 absolute top-20 cursor-pointer' onClick={() => router.push('/')}>
        <Icon icon='Home' size={40} color='primary-bg' />
      </div>
      <div className='bg-primary-bg h-full rounded-tr-[50px] pt-16'>
        <div className='text-AX1-Subhead text-center'>Start New Conversation</div>
      </div>
      <div className='absolute-center'>
        <div className='border-primary-100 text-AX1-Headline px-30 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Emotional Chat
        </div>
        <div className='border-primary-100 text-AX1-Headline px-30 mt-60 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Small Fun Chat
        </div>
      </div>
    </>
  );
};
