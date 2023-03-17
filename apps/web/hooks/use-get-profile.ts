import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { userState } from '@recoilState';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@config';

export const useGetProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  const [isLoading, setIsLoading] = useState(true);

  const isUserExist = !!auth.currentUser;

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, async fbUser => {
      setIsLoading(true);
      if (fbUser && user === null) {
        const { uid } = fbUser;
        const firestoreUser: User = await getUserProfile(uid);

        setUser({
          ...firestoreUser,
          uid,
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unlisten();
    };
  }, [user]);

  const getUserProfile = async (id: string) => {
    const userDocRef = doc(db, 'User', id);
    const userData = (await getDoc(userDocRef)).data() as User;

    return { ...userData };
  };

  return { user, resetUser, isUserExist, isLoading };
};
