import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { FirebaseError } from 'firebase/app';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Icon, Input } from '@components';

import { auth, db } from '@config';

import { useGetProfile, useWindowSize } from '@hooks';

const ChangeButton = ({ disabled, onClick }: { disabled: boolean; onClick: () => void }) => {
  return (
    <button
      disabled={disabled}
      className='disabled:bg-primary-bg bg-primary-bg disabled:border-grey-1 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34 rounded-[50px] border-[2px] py-9 pl-40 disabled:border-opacity-0 disabled:bg-opacity-30'
      onClick={onClick}>
      <div className='flex flex-row items-center'>
        <div className={classNames(disabled ? 'text-grey-6 text-opacity-50' : 'text-grey-6')}>
          Change
        </div>
        <Icon icon='RightDirection' size={40} color={disabled ? 'grey-1' : 'grey-6'} />
      </div>
    </button>
  );
};

export const Information = () => {
  const { user, resetUser } = useGetProfile();

  const router = useRouter();

  const { height } = useWindowSize();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changeFirstName = async () => {
    if (!user || !user.uid) return;

    const userRef = doc(db, 'User', user.uid);
    await updateDoc(userRef, {
      firstName,
    });
    alert('FirstName changed successfully.');
    resetUser();
  };

  const changeLastName = async () => {
    if (!user || !user.uid) return;

    const userRef = doc(db, 'User', user.uid);
    await updateDoc(userRef, {
      lastName,
    });
    alert('LastName changed successfully.');
    resetUser();
  };

  const logout = async () => {
    await signOut(auth).then(() => {
      resetUser();
    });
    router.replace('/');
  };

  const changePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    try {
      await updatePassword(user, newPassword);
      alert('Password changed successfully.');
    } catch (error) {
      const { code } = error as unknown as FirebaseError;

      if (code === 'auth/requires-recent-login') {
        alert('Please re-login to change your password.');
        logout().then(() => router.push('/login'));
      }
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <div className='h-70 flex w-full items-center bg-white'>
        <div className='ml-25 cursor-pointer' onClick={router.back}>
          <Icon icon='LeftDirection' color='primary-100' size={25} />
        </div>
      </div>
      <div
        className='bg-primary-100 pt-30 px-50 pb-50 relative h-full flex-col items-center justify-between rounded-tr-[50px] bg-opacity-50'
        style={{
          minHeight: height - 100,
        }}>
        <div className='text-grey-2 text-AX1-Caption2 mb-9 text-center'>account settings</div>
        <>
          <div>
            <div className='text-AX1-Subhead w-full text-center'>My Information</div>
            <div className='mt-50 flex w-full flex-col justify-center'>
              <div>
                <Input
                  label='First Name'
                  type='text'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <div className='mt-15 flex w-full justify-end'>
                  <ChangeButton
                    disabled={user.firstName === firstName || !firstName.length}
                    onClick={changeFirstName}
                  />
                </div>
              </div>

              <div className='mt-30'>
                <Input
                  label='Last Name'
                  type='text'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                <div className='mt-15 flex w-full justify-end'>
                  <ChangeButton
                    disabled={user.lastName === lastName || !lastName.length}
                    onClick={changeLastName}
                  />
                </div>
              </div>
              <div className='mt-30'>
                <Input
                  type='password'
                  label='Password'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <div className='mt-15 flex w-full justify-end'>
                  <ChangeButton
                    disabled={newPassword === '' || newPassword.length < 6}
                    onClick={changePassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
