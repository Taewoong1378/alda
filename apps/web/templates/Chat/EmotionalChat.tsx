import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Header } from '@components';

import { First } from './First';
import { Second } from './Second';

export const EmotionalChat = ({ hasChatInfo }: { hasChatInfo: boolean }) => {
  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState<boolean>(hasChatInfo);
  const [isSecondQuestionAnswered, setIsSecondQuestionAnswered] = useState<boolean>(false);

  return (
    <>
      <Header title='Emotional Chat' />
      <AnimatePresence>
        {!isFirstQuestionAnswered ? (
          <First setIsFirstQuestionAnswered={setIsFirstQuestionAnswered} />
        ) : (
          <Second
            isSecondQuestionAnswered={isSecondQuestionAnswered}
            setIsSecondQuestionAnswered={setIsSecondQuestionAnswered}
          />
        )}
      </AnimatePresence>
    </>
  );
};
