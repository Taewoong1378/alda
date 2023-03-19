import { FunnyChat } from '@templates';

import { useWindowSize } from '@hooks';

export default function FunnyChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        style={{
          height,
        }}>
        <FunnyChat />
      </main>
    </>
  );
}
