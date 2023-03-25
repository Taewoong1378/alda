import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { emotionState, emotionalChatState, smallFunChatState } from '@recoilState';
import { convertDateToYYYYMMDD, convertTimestampToDate } from '@util';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Icon, Portal } from '@components';

import { Storage } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

export const ChatEntry = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'emotional' | 'fun'>();

  const { width } = useWindowSize();
  const { user } = useGetProfile();

  const [emotionalChat] = useRecoilState(emotionalChatState);
  const resetEmotionalChat = useResetRecoilState(emotionalChatState);

  const [smallFunChat] = useRecoilState(smallFunChatState);
  const resetSmallFunChat = useResetRecoilState(smallFunChatState);

  const resetEmotionInfo = useResetRecoilState(emotionState);

  const [isAlreadyChatToday, setIsAlreadyChatToday] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsAlreadyChatToday(
        !!user.emotionalChat?.filter(v => {
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

  useEffect(() => {
    if (smallFunChat.createdAt) {
      if (
        convertDateToYYYYMMDD(new Date(smallFunChat.createdAt)) !==
        convertDateToYYYYMMDD(new Date())
      ) {
        return resetSmallFunChat();
      }
    }

    if (emotionalChat.createdAt) {
      if (
        convertDateToYYYYMMDD(new Date(emotionalChat.createdAt)) !==
        convertDateToYYYYMMDD(new Date())
      ) {
        return resetEmotionalChat();
      }
    }
  }, [emotionalChat, smallFunChat]);

  return (
    <>
      <div className='left-30 top-25 absolute cursor-pointer' onClick={() => router.push('/')}>
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
            if (isAlreadyChatToday) {
              return alert('You already recorded your emotion today. Please try tomorrow.');
            }

            if (
              localStorage.getItem(Storage.EMOTIONAL_CHAT) ||
              localStorage.getItem(Storage.EMOTION)
            ) {
              setModalVisible(true);
              setModalType('emotional');
              return;
            } else {
              router.push('/chat/emotional?hasChatInfo=false');
              return;
            }
          }}
          whileTap={{
            scale: 0.9,
          }}
          className='active:bg-primary-100 border-primary-100 text-AX1-Headline px-30 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Emotional Chat
        </motion.div>
        <motion.div
          onClick={() => {
            if (localStorage.getItem(Storage.SMALL_FUN_CHAT)) {
              setModalVisible(true);
              setModalType('fun');
              return;
            } else {
              router.push('/chat/fun');
              return;
            }
          }}
          whileTap={{
            scale: 0.9,
          }}
          className='active:bg-primary-100 border-primary-100 text-AX1-Headline px-30 mt-60 cursor-pointer whitespace-nowrap rounded-[50px] border-[1px] py-16 text-center'>
          Small Fun Chat
        </motion.div>
      </div>
      {modalVisible && (
        <Portal onClickBackground={() => setModalVisible(false)}>
          <div
            style={{
              width: width > 600 ? 530 : width - 70,
            }}
            className='absolute-center flex justify-center'
            onClick={() => setModalVisible(false)}>
            <div
              className='flex h-full w-full flex-col items-center rounded-xl bg-[#F2F2F2] bg-opacity-80 pt-16 backdrop-blur-sm backdrop-filter'
              onClick={e => e.stopPropagation()}>
              <div className='text-[17px] font-bold'>Continue last Conversation?</div>
              <div className='mt-4 text-center'>Do you want to continue last conversation?</div>
              <div className='mt-16 flex w-full flex-row items-center justify-evenly border-t-[0.5px] border-[rgba(60,60,67,0.36)]'>
                <div
                  className='w-full cursor-pointer border-r-[0.5px] border-[rgba(60,60,67,0.36)] px-16 py-11 text-center text-[17px] text-[#007AFF]'
                  onClick={() => {
                    if (modalType === 'emotional') {
                      if (isAlreadyChatToday) {
                        return alert('You already chatted today. Please try again tomorrow.');
                      }
                      resetEmotionalChat();
                      resetEmotionInfo();
                      router.push('/chat/emotional?hasChatInfo=false');
                      return;
                    }

                    if (modalType === 'fun') {
                      resetSmallFunChat();
                      router.push('/chat/fun');
                      return;
                    }
                  }}>
                  Start New
                </div>
                <div
                  className='w-full cursor-pointer px-16 py-11 text-center text-[17px] text-[#007AFF]'
                  onClick={() => {
                    if (modalType === 'emotional') {
                      if (localStorage.getItem(Storage.EMOTIONAL_CHAT))
                        return router.push('/chat/emotional?hasChatInfo=true');

                      if (localStorage.getItem(Storage.EMOTION))
                        return router.push('/chat/emotional?hasChatInfo=false');
                    }

                    if (modalType === 'fun') {
                      if (localStorage.getItem(Storage.SMALL_FUN_CHAT))
                        return router.push('/chat/fun?hasChatInfo=true');
                    }
                  }}>
                  Continue
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
