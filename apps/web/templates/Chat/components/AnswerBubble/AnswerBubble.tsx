interface AnswerBubbleProps {
  answer: React.ReactNode | string;
}

export const AnswerBubble = ({ answer }: AnswerBubbleProps) => {
  return (
    <div className='bg-primary-bg text-AX1-Subhead w-full rounded-[25px] rounded-br-none border-[2px] px-28 py-28'>
      {answer}
    </div>
  );
};
