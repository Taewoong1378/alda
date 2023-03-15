import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { weatherState } from '@recoilState';
import { motion } from 'framer-motion';

import { Button, Chip } from '@components';

import { HEADER_HEIGHT, detailMood } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

import { AnswerBubble, QuestionBubble } from '../components';

interface SecondProps {
  selectedDetailMoodChip: string[];
  setSelectedDetailMoodChip: (v: string[]) => void;
  selectedMoodChip?: Mood;
  isSecondQuestionAnswered: boolean;
  setIsSecondQuestionAnswered: (v: boolean) => void;
}

export const Second = ({
  selectedDetailMoodChip,
  setSelectedDetailMoodChip,
  selectedMoodChip,
  isSecondQuestionAnswered,
  setIsSecondQuestionAnswered,
}: SecondProps) => {
  const [weather] = useRecoilState(weatherState);

  const { user } = useGetProfile();
  const { height } = useWindowSize();

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

  return (
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
        <QuestionBubble isMain={false} question={`It's ${weather} today. How was your feeling?`} />
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
                      {selectedDetailMoodChip.map((v, i) => {
                        if (i === selectedDetailMoodChip.length - 1) {
                          return v;
                        } else {
                          return v + ', ';
                        }
                      })}
                    </span>
                    &nbsp; among the {selectedMoodChip?.toLowerCase()} feelings.
                  </div>
                  &nbsp;
                  <div>Can you ask me why?</div>
                </div>
              }
            />
          </motion.div>
        )}
      </motion.div>
      <div className='fixed left-1/2 bottom-60 -translate-x-1/2'>
        <Button
          text='Next'
          disabled={!selectedDetailMoodChip.length}
          onClick={() => setIsSecondQuestionAnswered(true)}
        />
      </div>
    </motion.div>
  );
};
