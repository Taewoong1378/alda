import { useEffect, useState } from 'react';

import { convertDateToYYYYMMDD, convertTimestampToDate } from '@util';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Icon } from '@components';

import { Storage } from '@constants';
import { useGetProfile } from '@hooks';

export const ChatEntry = () => {
  const { user } = useGetProfile();

  const [isAlreadyChatToday, setIsAlreadyChatToday] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsAlreadyChatToday(
        !!user.chat.filter(v => {
          if (v.createdAt) {
            return (
              convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) ===
              convertDateToYYYYMMDD(new Date())
            );
          }
        }).length,
      );
    }
  }, [user]);

  return (
    <>
      <div className='left-30 top-25 absolute cursor-pointer' onClick={router.back}>
        <Icon icon='LeftDirection' size={25} color='primary-bg' />
      </div>
      <div className='right-30 absolute top-20 cursor-pointer' onClick={() => router.push('/')}>
        <Icon icon='Home' size={40} color='primary-bg' />
      </div>
      <div className='bg-primary-bg h-full rounded-tr-[50px] pt-16'>
        <div className='text-AX1-Subhead text-center'>Start Conversation</div>
      </div>
      <div className='absolute-center'>
        <motion.div
          onClick={() => {
            // if (isAlreadyChatToday) {
            //   return alert('You already chatted today. Please try again tomorrow.');
            // }
            // return router.push('/chat/emotional?hasChatInfo=false');
            if (isAlreadyChatToday) {
              alert('You already chatted today. Please try again tomorrow.');
              router.push('/chat/fun');
              return;
            }

            if (localStorage.getItem(Storage.EMOTIONAL_CHAT))
              return router.push('/chat/emotional?hasChatInfo=true');

            if (localStorage.getItem(Storage.EMOTION))
              return router.push('/chat/emotional?hasChatInfo=false');

            alert("No last conversation. You'll be taken to a new conversation page.");
            router.push('/chat?isLast=false');
            return;
          }}
          whileTap={{
            scale: 0.9,
          }}
          className='active:bg-primary-100 border-primary-100 text-AX1-Headline px-30 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Emotional Chat
        </motion.div>
        <motion.div
          onClick={() => {
            if (localStorage.getItem(Storage.SMALL_FUN_CHAT))
              return router.push('/chat/fun?hasChatInfo=true');

            alert("No last conversation. You'll be taken to a new conversation page.");
            router.push('/chat/fun?hasChatInfo=false');
            return;
          }}
          whileTap={{
            scale: 0.9,
          }}
          className='active:bg-primary-100 border-primary-100 text-AX1-Headline px-30 mt-60 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Small Fun Chat
        </motion.div>
      </div>
    </>
  );
};
