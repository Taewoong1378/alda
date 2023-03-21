import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import { QuestionBubble } from '@templates/Chat/components';

import aiLoadingAnimation from '@assets/lottie/ai-loading.json';

export const Loading = () => {
  return (
    <motion.div
      className='mt-31'
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      exit={{ opacity: 0, x: -10 }}>
      <QuestionBubble
        className='px-0 pt-0 pb-0'
        isMain={true}
        question={
          <Lottie
            animationData={aiLoadingAnimation}
            loop={true}
            style={{ height: 200, width: 300 }}
          />
        }
      />
    </motion.div>
  );
};
