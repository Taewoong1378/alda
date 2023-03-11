import { EmotionalChat } from '@templates';

import { useWindowSize } from '@hooks';

export default function EmotionalChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        className='bg-primary-bg'
        style={{
          height,
        }}>
        <EmotionalChat />
      </main>
    </>
  );
}
