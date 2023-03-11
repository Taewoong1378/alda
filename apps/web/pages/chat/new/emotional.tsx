import { EmotionalChat } from '@templates';

import { useWindowSize } from '@hooks';

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
