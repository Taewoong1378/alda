import { useWindowSize } from '@util';

import { EmotionalChat } from '@templates';

export default function EmotionalChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        style={{
          height,
        }}>
        <EmotionalChat />
      </main>
    </>
  );
}
