import { useCallback, useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { emotionState, emotionalChatState } from '@recoilState';
import axios from 'axios';
import classNames from 'classnames';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Button, Chip, Loading as FullLoading, Icon, Portal } from '@components';

import { db } from '@config';

import recordingAnimation from '@assets/lottie/recording.json';
import { BACKEND_URL, HEADER_HEIGHT, detailMood } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

import { AnswerBubble, QuestionBubble } from '../components';
import { Loading } from './components';

interface SecondProps {
  isSecondQuestionAnswered: boolean;
  setIsSecondQuestionAnswered: (v: boolean) => void;
}

export const Second = ({ isSecondQuestionAnswered, setIsSecondQuestionAnswered }: SecondProps) => {
  const { width } = useWindowSize();

  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [emotion, setEmotion] = useRecoilState(emotionState);
  const [chat, setChat] = useRecoilState(emotionalChatState);
  const resetEmotionalChat = useResetRecoilState(emotionalChatState);
  const resetEmotionInfo = useResetRecoilState(emotionState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [imgSrc, setImgSrc] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState<boolean>(false);

  const { user, resetUser } = useGetProfile();
  const { height } = useWindowSize();

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

      const response = await axios.post(`${BACKEND_URL}/emotion/`, formData, {
        ...config,
      });
      setIsLoading(false);
      setChat({ ...chat, messages: [...chat.messages, ...response.data] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = useCallback(
    (v: Emotion['small'][number]) => {
      if (emotion.small.includes(v)) {
        setEmotion({ ...emotion, small: emotion.small.filter(vv => vv !== v) });
      } else {
        setEmotion({ ...emotion, small: [...emotion.small, v] });
      }
    },
    [emotion.small],
  );

  const getChatResponse = async (data: ChatRequest): Promise<ChatResponse[]> => {
    const result = await axios.post(`${BACKEND_URL}/emotion/`, data);

    return result.data;
  };

  const finishChatting = async () => {
    if (!user || !user.uid) return;
    setImageLoading(true);

    const docRef = doc(db, 'User', user.uid);

    const { data } = await axios.post(`${BACKEND_URL}/image/`, {
      messages: chat.messages,
      user_id: user.uid,
      language: 'eng',
    });

    setImageLoading(false);
    setImgSrc(data.image);

    await updateDoc(docRef, {
      emotion: [
        ...user.emotion,
        {
          big: emotion.big,
          small: emotion.small,
          createdAt: new Date(),
        },
      ],
      emotionalChat: [
        ...user.emotionalChat,
        {
          messages: chat.messages,
          createdAt: new Date(),
          image: data.image,
          // summary: data.summary,
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

  useEffect(() => {
    if (audioChunks.length) {
      sendAudioToServer();
    }
  }, [audioChunks]);

  useEffect(() => {
    if (!!chat.messages.length) setIsSecondQuestionAnswered(true);
  }, []);

  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      return scrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }

    if (isSecondQuestionAnswered && scrollRef.current) {
      return scrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [isSecondQuestionAnswered, isLoading, scrollRef]);

  useEffect(() => {
    if (!imgSrc) return;
    setIsImageModalVisible(true);
  }, [imgSrc]);

  if (!user) return null;
  if (imageLoading) return <FullLoading />;

  return (
    <>
      <motion.div
        className='px-27 bg-primary-bg pb-[200px]'
        style={{
          paddingTop: HEADER_HEIGHT + 24,
          minHeight: height + HEADER_HEIGHT,
        }}>
        <motion.div
          className='mt-31'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0, x: -10 }}>
          <QuestionBubble
            isMain={true}
            question={
              <div className='text-AX1-Subhead'>
                You've had a &nbsp;
                <span className='text-AX1-Subhead text-primary-bg'>{emotion.big}</span>
                &nbsp; day, {user.firstName}. Tell me specifically what you were feeling.
              </div>
            }
          />
          <div className='flex w-full flex-wrap justify-center gap-12 px-20'>
            {emotion.big &&
              detailMood[emotion.big].detail.map(v => {
                return (
                  <Chip
                    key={v}
                    text={v}
                    onClick={() => handleClick(v)}
                    isSelected={emotion.small.includes(v)}
                  />
                );
              })}
          </div>
          {isSecondQuestionAnswered && (
            <motion.div
              className='pl-27 mt-31'
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              exit={{ opacity: 0, x: 10 }}>
              <AnswerBubble
                answer={
                  <div className='text-AX1-Subhead'>
                    <div>
                      I felt&nbsp;
                      <span className='text-AX1-Subhead text-primary-100'>
                        {emotion.small.map((v, i) => {
                          if (i === emotion.small.length - 1) {
                            return v;
                          } else {
                            return v + ', ';
                          }
                        })}
                      </span>
                      &nbsp; among the {emotion.big?.toLowerCase()} feelings.
                    </div>
                  </div>
                }
              />
            </motion.div>
          )}
          {!!chat.messages.length &&
            chat.messages.map((v, i) => {
              if (i % 2 === 0) {
                return (
                  <motion.div
                    key={i}
                    className='mt-31'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={Object.assign(
                      { duration: 1 },
                      JSON.parse(router.query.hasChatInfo as string)
                        ? {
                            delay: 1.5,
                          }
                        : {},
                    )}
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
                  transition={Object.assign(
                    { duration: 1 },
                    JSON.parse(router.query.hasChatInfo as string)
                      ? {
                          delay: 1.5,
                        }
                      : {},
                  )}
                  exit={{ opacity: 0, x: -10 }}>
                  <AnswerBubble answer={<div className='text-AX1-Subhead'>{v.content}</div>} />
                </motion.div>
              );
            })}
          {isLoading && <Loading />}
        </motion.div>
        <div ref={scrollRef} />
        <div className='fixed left-1/2 bottom-60 flex -translate-x-1/2 flex-col items-center'>
          {!isSecondQuestionAnswered && (
            <Button
              text='Next'
              disabled={!emotion.small.length}
              onClick={() => {
                setIsSecondQuestionAnswered(true);
                setIsLoading(true);
                setEmotion(prev => ({
                  ...prev,
                  small: emotion.small,
                }));

                if (emotion.big && emotion.small.length) {
                  getChatResponse({
                    lang: 'eng',
                    user_id: user.uid,
                    userfeeling_big: emotion.big,
                    userfeeling_small: emotion.small,
                  }).then(res => {
                    setIsLoading(false);
                    setChat(prev => ({
                      user: user.uid,
                      messages: [
                        ...prev.messages,
                        {
                          role: 'system',
                          content: res[0].content,
                        },
                      ],
                      image: '',
                      summary: [],
                      createdAt: new Date(),
                    }));
                  });
                }
              }}
            />
          )}
        </div>
        {isSecondQuestionAnswered && (
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
        )}
      </motion.div>
      {isImageModalVisible && (
        <Portal>
          <div
            style={{
              width: width - 40,
            }}
            className='absolute-center flex flex-col justify-center'>
            <img
              src={imgSrc}
              width={300}
              height={300}
              className='border-secondary-101 mx-auto rounded-[25px] border-[2px]'
            />
            <button
              className='text-AX1-Subhead border-secondary-101 pr-34 mt-30 rounded-[50px] border-[2px] bg-white py-9 pl-40'
              onClick={() => {
                resetEmotionalChat();
                resetEmotionInfo();
                router.push('/');
              }}>
              <div className='flex flex-row items-center justify-center'>
                <div className={classNames('text-secondary-101')}>Go home</div>
                <Icon icon='RightDirection' size={40} color='secondary-101' />
              </div>
            </button>
          </div>
        </Portal>
      )}
    </>
  );
};
