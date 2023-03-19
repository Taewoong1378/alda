import { BottomNavbar } from '@components';
import { Chat } from '@templates';

import { BOTTOM_NAVBAR_HEIGHT } from '@constants';
import { useWindowSize } from '@hooks';

export default function ChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        style={{
          height: height - BOTTOM_NAVBAR_HEIGHT,
        }}>
        <Chat />
      </main>
      <BottomNavbar />
    </>
  );
}
