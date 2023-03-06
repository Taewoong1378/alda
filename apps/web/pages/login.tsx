import { useWindowSize } from '@util';

import { Login } from '@templates';

export default function LoginPage() {
  const { height } = useWindowSize();

  return (
    <main style={{ height }}>
      <Login />
    </main>
  );
}
