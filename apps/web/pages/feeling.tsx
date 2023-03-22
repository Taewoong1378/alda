import { useRouter } from 'next/router';

import { Feeling } from '@templates';

export default function FeelingPage() {
  const router = useRouter();

  return (
    <main>
      <Feeling date={router.query.date as string} />
    </main>
  );
}
