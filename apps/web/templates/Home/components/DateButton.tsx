import classNames from 'classnames';
import { motion } from 'framer-motion';

import { getDateAndDay } from '../util';

export const DateButton = ({
  date,
  isSelected,
  onClick,
}: {
  date: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const dateAndDayArr = getDateAndDay(date);

  return (
    <div>
      <motion.button
        className='w-38 h-[60px] rounded-[10px] bg-[rgba(248,247,243,0.5)]'
        onClick={onClick}
        animate={{
          height: isSelected ? '90px' : '60px',
        }}
        transition={{ duration: 0.5 }}>
        <div
          className={classNames(
            'text-[20px] transition-all',
            isSelected ? 'text-grey-6 text-[28px] font-bold' : 'text-grey-2',
          )}>
          {dateAndDayArr[0]}
        </div>
      </motion.button>
      <div
        className={classNames(
          'text-center text-[12px]',
          isSelected ? 'text-grey-6' : 'text-grey-2',
        )}>
        {dateAndDayArr[1]}
      </div>
    </div>
  );
};
