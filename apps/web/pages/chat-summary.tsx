import { useRouter } from 'next/router';

import { ChatSummary } from '@templates';

import { useWindowSize } from '@hooks';

export default function ChatSummaryPage() {
  const { height } = useWindowSize();

  const router = useRouter();

  return (
    <main
      className='bg-primary-bg'
      style={{
        height,
      }}>
      <ChatSummary date={router.query.date as string} />
    </main>
  );
}
