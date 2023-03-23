import { useState } from 'react';
import Lottie from 'react-lottie';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { smallFunChatState, userState } from '@recoilState';
import axios from 'axios';
import classNames from 'classnames';
import { doc, updateDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';

import { Header, Icon } from '@components';

import { db } from '@config';

import recordingAnimation from '@assets/lottie/recording.json';
import { BACKEND_URL, HEADER_HEIGHT } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

import { Loading } from './Second/components';
import { QuestionBubble } from './components';

export const FunnyChat = () => {
  const { user } = useGetProfile();
  const { height } = useWindowSize();

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [chat, setChat] = useRecoilState(smallFunChatState);
  const resetFunChat = useResetRecoilState(smallFunChatState);
  const resetUser = useResetRecoilState(userState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startRecording = async () => {
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.addEventListener('dataavailable', event => {
        setAudioChunks(chunks => [...chunks, event.data]);
      });
      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const sendAudioToServer = async () => {
    try {
      const audioBlob = new Blob([audioChunks[audioChunks.length - 1]], { type: 'audio/wav' });

      const formData = new FormData();
      formData.append('messages', JSON.stringify(chat.messages));
      formData.append('user_id', user?.uid as string);
      formData.append('language', 'eng');
      formData.append('audio', audioBlob, 'recording.wav');

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      // TODO: API 변경
      const response = await axios.post(`${BACKEND_URL}/emotion/`, formData, {
        ...config,
      });
      setIsLoading(false);
      setChat({ ...chat, messages: [...chat.messages, ...response.data] });
    } catch (error) {
      console.error(error);
    }
  };

  const finishChatting = async () => {
    if (!user || !user.uid) return;

    const docRef = doc(db, 'User', user.uid);

    await updateDoc(docRef, {
      funChat: [
        ...user.funChat,
        {
          messages: chat.messages,
          createdAt: new Date(),
          summary: [],
        },
      ],
    });

    resetUser();
  };

  const defaultOptions = {
    loop: true,
    autoplay: isRecording,
    animationData: recordingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!user) return null;

  return (
    <>
      <Header title='Small Fun Chat' />
      <AnimatePresence>
        <motion.div
          className='px-27 bg-primary-bg pb-[200px]'
          style={{
            paddingTop: HEADER_HEIGHT + 24,
            minHeight: height + HEADER_HEIGHT,
          }}>
          <motion.div
            className='pr-27'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0, x: -10 }}>
            <QuestionBubble
              isMain={true}
              question={
                <>
                  <div>{user.firstName},</div>&nbsp;&nbsp;
                  <div>what should we talk about today?</div>
                </>
              }
            />
          </motion.div>
        </motion.div>
        {isLoading && <Loading />}
        <div className='bottom-30 fixed left-1/2 flex -translate-x-1/2 flex-col items-center'>
          <>
            <div
              className={classNames(isLoading && 'pointer-events-none')}
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                  setIsLoading(true);
                } else {
                  startRecording();
                }
              }}>
              <Lottie
                options={defaultOptions}
                style={{ height: 100, width: 120 }}
                isStopped={!isRecording}
              />
            </div>
            <button
              className='disabled:bg-grey-1 disabled:border-grey-1 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34 flex flex-row items-center rounded-[50px] border-[2px] bg-white py-3 pl-40 disabled:border-opacity-0 disabled:bg-opacity-30'
              onClick={finishChatting}>
              <div className='whitespace-nowrap'>Chat End</div>
              <Icon icon='RightDirectionSmall' size={20} color='black' />
            </button>
          </>
        </div>
      </AnimatePresence>
    </>
  );
};
