import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Header, Input } from '@components';

import { HEADER_HEIGHT } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

import { QuestionBubble } from './components';

export const FunnyChat = () => {
  const { user } = useGetProfile();
  const { height } = useWindowSize();

  const [chat, setChat] = useState('');

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
                  <div>{user?.firstName},</div>&nbsp;&nbsp;
                  <div>what should we talk about today?</div>
                </>
              }
            />
          </motion.div>
        </motion.div>
        <Input value={chat} onChange={e => setChat(e.target.value)} />
      </AnimatePresence>
    </>
  );
};
