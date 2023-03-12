import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Chip, Header, Loading } from '@components';

import { HEADER_HEIGHT } from '@constants';
import { useGetLocation, useGetProfile, useWindowSize } from '@hooks';

interface QuestionBubbleProps {
  question: React.ReactNode | string;
  isMain: boolean;
}
interface AnswerBubbleProps {
  answer: React.ReactNode | string;
}

const detailMood = {
  Happy: {
    mood: 'Happy',
    detail: ['Joy', 'Excited', 'Love', 'Gleeful', 'Pleasant'],
  },
  Ordinary: {
    mood: 'Ordinary',
    detail: [],
  },
  Scared: {
    mood: 'Scared',
    detail: [],
  },
  Sad: {
    mood: 'Sad',
    detail: [],
  },
  Depressed: {
    mood: 'Depressed',
    detail: [],
  },
  Angry: {
    mood: 'Angry',
    detail: [],
  },
};

const moodArr = [
  {
    id: 0,
    text: 'Happy',
  },
  {
    id: 1,
    text: 'Ordinary',
  },
  {
    id: 2,
    text: 'Scared',
  },
  {
    id: 3,
    text: 'Sad',
  },
  {
    id: 4,
    text: 'Depressed',
  },
  {
    id: 5,
    text: 'Angry',
  },
] as const;

const QuestionBubble = ({ isMain, question }: QuestionBubbleProps) => {
  return (
    <div
      className={classNames(
        'bg-primary-100 text-AX1-Subhead w-full rounded-[25px] rounded-tl-none border-[2px] px-28',
        isMain ? 'pt-28 pb-56' : 'py-28',
      )}>
      {question}
    </div>
  );
};

const AnswerBubble = ({ answer }: AnswerBubbleProps) => {
  return (
    <div className='bg-primary-bg text-AX1-Subhead w-full rounded-[25px] rounded-br-none border-[2px] px-28 py-28'>
      {answer}
    </div>
  );
};

export const EmotionalChat = () => {
  const { height } = useWindowSize();

  const { user } = useGetProfile();
  const { myLocation } = useGetLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<string>();

  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState<boolean>(false);

  const [selectedMoodChip, setSelectedMoodChip] = useState<keyof typeof detailMood>();
  const [selectedDetailMoodChip, setSelectedDetailMoodChip] = useState<string[]>([]);

  const handleClick = useCallback(
    (v: string) => {
      if (selectedDetailMoodChip.includes(v)) {
        setSelectedDetailMoodChip(selectedDetailMoodChip.filter(vv => vv !== v));
      } else {
        setSelectedDetailMoodChip([...selectedDetailMoodChip, v]);
      }
    },
    [selectedDetailMoodChip],
  );

  const getWeather = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation?.latitude}&lon=${myLocation?.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`,
    );
    return data;
  };

  useEffect(() => {
    if (myLocation) {
      getWeather().then(data => {
        setCurrentWeather(data.weather[0].main);
        setIsLoading(false);
      });
    }
  }, [myLocation]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header title='Emotional Chat' />
      <AnimatePresence>
        {!isFirstQuestionAnswered && (
          <div className='px-27 center flex h-full flex-col'>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, x: 10 }}>
              <QuestionBubble
                isMain={true}
                question={`It's ${currentWeather} today. How was your feeling?`}
              />
              <div className='flex flex-row flex-wrap items-center justify-center gap-12'>
                {moodArr.map(v => {
                  return (
                    <Chip
                      key={v.id}
                      text={v.text}
                      onClick={() => {
                        setSelectedMoodChip(v.text);
                        setSelectedDetailMoodChip([]);
                      }}
                      isSelected={v.text === selectedMoodChip}
                    />
                  );
                })}
              </div>
            </motion.div>
            <div className='absolute bottom-60'>
              <Button
                text='Next'
                disabled={!selectedMoodChip}
                onClick={() => setIsFirstQuestionAnswered(true)}
              />
            </div>
          </div>
        )}
        {isFirstQuestionAnswered && (
          <motion.div
            className={`px-27 mb-54 bg-primary-bg h-full`}
            style={{
              paddingTop: HEADER_HEIGHT + 24,
              minHeight: height + HEADER_HEIGHT + 24,
            }}>
            <motion.div
              className='pr-27'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, x: -10 }}>
              <QuestionBubble
                isMain={false}
                question={`It's ${currentWeather} today. How was your feeling?`}
              />
            </motion.div>
            <motion.div
              className='pl-27 mt-31'
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              exit={{ opacity: 0, x: 10 }}>
              <AnswerBubble
                answer={
                  <div className='text-AX1-Subhead'>
                    I was&nbsp;
                    <span className='text-AX1-Subhead text-primary-100'>{selectedMoodChip}</span>
                    &nbsp; today.
                  </div>
                }
              />
            </motion.div>
            <motion.div
              className='mt-31'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              exit={{ opacity: 0, x: -10 }}>
              <QuestionBubble
                isMain={true}
                question={
                  <div className='text-AX1-Subhead'>
                    You've had a &nbsp;
                    <span className='text-AX1-Subhead text-primary-bg'>{selectedMoodChip}</span>
                    &nbsp; day, {user?.firstName}. Tell me specifically what you were feeling.
                  </div>
                }
              />
              <div className='flex w-full flex-wrap justify-center gap-12 px-20'>
                {selectedMoodChip &&
                  detailMood[selectedMoodChip].detail.map(v => {
                    return (
                      <Chip
                        key={v}
                        text={v}
                        onClick={() => handleClick(v)}
                        isSelected={selectedDetailMoodChip.includes(v)}
                      />
                    );
                  })}
              </div>
            </motion.div>
            <div className='fixed left-1/2 bottom-60 -translate-x-1/2'>
              <Button
                text='Next'
                disabled={!selectedMoodChip}
                onClick={() => setIsFirstQuestionAnswered(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
