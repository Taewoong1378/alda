import { useWindowSize } from '@util';

import { LastChat } from '@templates';

export default function LastChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        style={{
          height,
        }}>
        <LastChat />
      </main>
    </>
  );
}
