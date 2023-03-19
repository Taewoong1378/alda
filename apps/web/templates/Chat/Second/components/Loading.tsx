import { motion } from 'framer-motion';

import { QuestionBubble } from '@templates/Chat/components';

export const Loading = () => {
  return (
    <motion.div
      className='mt-31'
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      exit={{ opacity: 0, x: -10 }}>
      <QuestionBubble isMain={true} question={<div className='text-AX1-Subhead'>loading...</div>} />
    </motion.div>
  );
};
