import { useRecoilState } from 'recoil';

import { emotionState, weatherState } from '@recoilState';
import { motion } from 'framer-motion';

import { Button, Chip } from '@components';

import { moodArr } from '@constants';
import { useGetProfile } from '@hooks';

import { QuestionBubble } from '../components/QuestionBubble';

interface FirstProps {
  setIsFirstQuestionAnswered: (v: boolean) => void;
}

export const First = ({ setIsFirstQuestionAnswered }: FirstProps) => {
  const { user } = useGetProfile();

  const [emotion, setEmotion] = useRecoilState(emotionState);
  const [weather] = useRecoilState(weatherState);

  if (!user) return null;

  return (
    <div className='px-27 center flex h-full flex-col'>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, x: 10 }}>
        <QuestionBubble isMain={true} question={`It's ${weather} today. How was your feeling?`} />
        <div className='flex flex-row flex-wrap items-center justify-center gap-12'>
          {moodArr.map(v => {
            return (
              <Chip
                key={v.id}
                text={v.text}
                onClick={() => {
                  setEmotion({
                    user: user?.uid,
                    big: v.text,
                    small: [],
                    createdAt: new Date(),
                  });
                }}
                isSelected={v.text === emotion.big}
              />
            );
          })}
        </div>
      </motion.div>
      <div className='absolute bottom-60'>
        <Button
          text='Next'
          disabled={!emotion.big}
          onClick={() => {
            if (!emotion.big) return;
            setIsFirstQuestionAnswered(true);
          }}
        />
      </div>
    </div>
  );
};
