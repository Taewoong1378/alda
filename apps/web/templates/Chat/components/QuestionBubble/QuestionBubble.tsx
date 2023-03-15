import classNames from 'classnames';

interface QuestionBubbleProps {
  question: React.ReactNode | string;
  isMain: boolean;
}

export const QuestionBubble = ({ isMain, question }: QuestionBubbleProps) => {
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
