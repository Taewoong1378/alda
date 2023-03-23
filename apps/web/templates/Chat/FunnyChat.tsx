import { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { smallFunChatState } from '@recoilState';
import axios from 'axios';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Header } from '@components';

import recordingAnimation from '@assets/lottie/recording.json';
import { BACKEND_URL, HEADER_HEIGHT } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

import { Loading } from './Second/components';
import { AnswerBubble, QuestionBubble } from './components';

export const FunnyChat = () => {
  const { user } = useGetProfile();
  const { height } = useWindowSize();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [chat, setChat] = useRecoilState(smallFunChatState);
  const resetFunChat = useResetRecoilState(smallFunChatState);

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

  const startNewChat = () => {
    resetFunChat();
  };

  const defaultOptions = {
    loop: true,
    autoplay: isRecording,
    animationData: recordingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const renderAnswerIcon = () => {
    if (isLoading) return null;

    if (isRecording) {
      return <Lottie options={defaultOptions} style={{ height: 100, width: 120 }} />;
    }

    return <Button text='Answer' className='mb-16 w-full' />;
  };

  useEffect(() => {
    if (audioChunks.length) {
      sendAudioToServer();
    }
  }, [audioChunks]);

  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      return scrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [isLoading, scrollRef]);

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
        {!!chat.messages.length &&
          chat.messages.map((v, i) => {
            if (i % 2 === 0) {
              return (
                <motion.div
                  key={i}
                  className='mt-31'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  exit={{ opacity: 0, x: -10 }}>
                  <QuestionBubble
                    isMain={true}
                    question={<div className='text-AX1-Subhead'>{v.content}</div>}
                  />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={i}
                className='mt-31'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 0, x: -10 }}>
                <AnswerBubble answer={<div className='text-AX1-Subhead'>{v.content}</div>} />
              </motion.div>
            );
          })}
        {isLoading && <Loading />}
        <div className='bottom-30 fixed left-1/2 flex -translate-x-1/2 flex-col items-center'>
          <div className='w-full'>
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
              {renderAnswerIcon()}
            </div>
            <Button text='New chat' onClick={startNewChat} disabled={isLoading} />
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};
