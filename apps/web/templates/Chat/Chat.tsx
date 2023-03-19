import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { emotionState, emotionalChatState, smallFunChatState } from '@recoilState';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Storage } from '@constants';
import { useWindowSize } from '@hooks';

export const Chat = () => {
  const [isModalShow, setIsModalShow] = useState(false);

  const { width } = useWindowSize();

  const router = useRouter();
  const resetEmotionalChat = useResetRecoilState(emotionalChatState);
  const resetEmotion = useResetRecoilState(emotionState);

  const [emotion] = useRecoilState(emotionState);
  const [emotionalChat] = useRecoilState(emotionalChatState);
  const [smallFunChat] = useRecoilState(smallFunChatState);

  return (
    <>
      <div className='bg-primary-100 center h-[50%] px-[50px]'>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className='border-primary-bg w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'
          onClick={() => {
            if (localStorage.getItem(Storage.EMOTIONAL_CHAT))
              return router.push('/chat/emotional?hasChatInfo=true');

            if (localStorage.getItem(Storage.EMOTION))
              return router.push('/chat/emotional?hasChatInfo=false');

            if (localStorage.getItem(Storage.SMALL_FUN_CHAT)) return router.push('/chat/fun');

            alert("No last conversation. You'll be taken to a new conversation page.");
            router.push('/chat?isLast=false');
            return;
          }}>
          <div className='text-AX1-Subhead'>Continue with</div>
          <div className='text-AX1-Subhead rounded-[50px]'>Last Conversation</div>
        </motion.div>
      </div>
      <div
        className='bg-primary-bg center h-[50%] border-t-[2px] border-t-black px-[50px]'
        onClick={() => {
          router.push('/chat?isLast=false');
          resetEmotionalChat();
          resetEmotion();
        }}>
        <motion.div
          whileTap={{
            scale: 0.9,
          }}
          className='border-primary-100 w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'>
          <div className='text-AX1-Subhead'>Start</div>
          <div className='text-AX1-Subhead rounded-[50px]'>New Conversation</div>
        </motion.div>
      </div>
    </>
  );
};
