import { useRouter } from 'next/router';

import { ChatEntry } from '@templates';

import { useWindowSize } from '@hooks';

export default function ChatPage() {
  const { height } = useWindowSize();
  const router = useRouter();

  return (
    <>
      <main
        className='bg-primary-100 relative pt-80'
        style={{
          height,
        }}>
        <ChatEntry />
      </main>
    </>
  );
}
