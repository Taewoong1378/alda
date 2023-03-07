import Lottie from 'lottie-react';

import { Portal } from '@components';

import loadingAnimation from '@assets/lottie/loading.json';

export const Loading = () => {
  return (
    <Portal>
      <div className='flex h-full w-full flex-col items-center'>
        <Lottie animationData={loadingAnimation} loop={true} style={{ height: 700, width: 700 }} />
      </div>
    </Portal>
  );
};
