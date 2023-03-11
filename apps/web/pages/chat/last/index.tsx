import { LastChat } from '@templates';

import { useWindowSize } from '@hooks';

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
