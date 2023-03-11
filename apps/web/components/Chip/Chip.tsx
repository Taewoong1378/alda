import classNames from 'classnames';
import { motion } from 'framer-motion';

interface ChipProps {
  isSelected: boolean;
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Chip = ({ disabled, isSelected, text, onClick, className }: ChipProps) => {
  const renderText = () => {
    return (
      <div className={classNames('inline-block whitespace-nowrap transition-all')}>{text}</div>
    );
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={classNames(
        'border-grey-6 mt-11 flex w-fit items-center justify-center gap-3 rounded-[45px] border-[2px] py-5 px-12 transition-all',
        className,
        isSelected ? 'bg-primary-100' : 'bg-primary',
        disabled ? 'cursor-default' : 'cursor-pointer',
      )}
      onClick={onClick}>
      {renderText()}
    </motion.div>
  );
};
