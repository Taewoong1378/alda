import { FunnyChat } from '@templates';

import { useWindowSize } from '@hooks';

export default function FunnyChatPage() {
  const { height } = useWindowSize();

  return (
    <main
      className='bg-primary-bg'
      style={{
        height,
      }}>
      <FunnyChat />
    </main>
  );
}
