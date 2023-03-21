import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { emotionState, emotionalChatState } from '@recoilState';
import axios from 'axios';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import { Button, Chip } from '@components';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const [emotion, setEmotion] = useRecoilState(emotionState);
  const [chat, setChat] = useRecoilState(emotionalChatState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useGetProfile();
  const { height } = useWindowSize();

  const startRecording = async () => {
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
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const sendAudioToServer = async () => {
    try {
      console.log('audioChunks', audioChunks);
      const audioBlob = new Blob([audioChunks[audioChunks.length - 1]], { type: 'audio/wav' });
      console.log('audioBlob', audioBlob);
      const data = {
        messages: chat.messages,
        user_id: user?.uid,
      };

      const formData = new FormData();
      formData.append(
        'audio',
        new File([audioBlob], 'soundBlob', {
          lastModified: new Date().getTime(),
          type: 'audio',
        }),
      );

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const response = await axios.post(`${BACKEND_URL}/emotion/`, formData, {
        ...config,
      });

      // const response = await axios.post(`${BACKEND_URL}/emotion/`, {
      //   messages: chat.messages,
      //   user_id: user?.uid,
      //   audio: new File([audioBlob], 'soundBlob', {
      //     lastModified: new Date().getTime(),
      //     type: 'audio',
      //   }),
      // });
      console.log(response.data);
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
    console.log('isRecording', isRecording);
  }, [isRecording]);

  if (!user) return null;

  return (
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
      </motion.div>
      <div ref={scrollRef} />
      <div className='fixed left-1/2 bottom-60 -translate-x-1/2'>
        {!isSecondQuestionAnswered ? (
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
                        content: res[0].content,
                        type: 'system',
                      },
                    ],
                    createdAt: new Date(),
                  }));
                });
              }
            }}
          />
        ) : (
          <>
            {/* <Button text='Answer' onClick={() => {startRecording(); setIsRecording(true);}} />
            <button
              onClick={() => {
                stopRecording();
              }}>
              Stop Recording and Send Audio to Server
            </button> */}
            <div
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                  sendAudioToServer();
                  setIsRecording(false);
                } else {
                  startRecording();
                  setIsRecording(true);
                }
              }}>
              <Lottie
                animationData={recordingAnimation}
                loop={true}
                autoplay={isRecording}
                style={{ height: 100, width: 300 }}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
