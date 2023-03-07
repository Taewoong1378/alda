import { useWindowSize } from '@util';

import { NewChat } from '@templates';

export default function NewChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        style={{
          height,
        }}>
        <NewChat />
      </main>
    </>
  );
}
