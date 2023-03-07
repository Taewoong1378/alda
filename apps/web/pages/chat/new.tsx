import { useWindowSize } from '@util';

import { NewChat } from '@templates';

export default function NewChatPage() {
  const { height } = useWindowSize();

  return (
    <>
      <main
        className='bg-primary-100 pt-80'
        style={{
          height,
        }}>
        <NewChat />
      </main>
    </>
  );
}
