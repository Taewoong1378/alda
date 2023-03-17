import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Header } from '@components';

import { detailMood } from '@constants';

import { First } from './First';
import { Second } from './Second';

export const EmotionalChat = () => {
  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState<boolean>(false);
  const [isSecondQuestionAnswered, setIsSecondQuestionAnswered] = useState<boolean>(false);

  const [selectedMoodChip, setSelectedMoodChip] = useState<keyof typeof detailMood>();
  const [selectedDetailMoodChip, setSelectedDetailMoodChip] = useState<Emotion['small']>([]);

  return (
    <>
      <Header title='Emotional Chat' />
      <AnimatePresence>
        {!isFirstQuestionAnswered ? (
          <First
            selectedMoodChip={selectedMoodChip}
            setIsFirstQuestionAnswered={setIsFirstQuestionAnswered}
            setSelectedMoodChip={setSelectedMoodChip}
            setSelectedDetailMoodChip={setSelectedDetailMoodChip}
          />
        ) : (
          <Second
            isFirstQuestionAnswered={isFirstQuestionAnswered}
            isSecondQuestionAnswered={isSecondQuestionAnswered}
            setIsSecondQuestionAnswered={setIsSecondQuestionAnswered}
            selectedDetailMoodChip={selectedDetailMoodChip}
            setSelectedDetailMoodChip={setSelectedDetailMoodChip}
            selectedMoodChip={selectedMoodChip}
          />
        )}
      </AnimatePresence>
    </>
  );
};
