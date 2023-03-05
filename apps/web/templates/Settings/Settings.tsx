import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '@config';

export const Settings = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};
