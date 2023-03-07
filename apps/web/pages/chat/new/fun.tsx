import { useWindowSize } from '@util';

import { FunnyChat } from '@templates';

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
