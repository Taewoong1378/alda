export const Chat = () => {
  return (
    <>
      <div className='bg-primary-100 center h-[50%] px-[50px]'>
        <div className='border-primary-bg w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'>
          <div className='text-AX1-Subhead'>Continue with</div>
          <div className='text-AX1-Subhead rounded-[50px]'>Last Conversation</div>
        </div>
      </div>
      <div className='bg-primary-bg center h-[50%] px-[50px]'>
        <div className='border-primary-100 w-full cursor-pointer rounded-[50px] border-[1px] py-16 text-center'>
          <div className='text-AX1-Subhead'>Start</div>
          <div className='text-AX1-Subhead rounded-[50px]'>New Conversation</div>
        </div>
      </div>
    </>
  );
};
