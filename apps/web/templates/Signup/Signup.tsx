import React, { useState } from 'react';

import classNames from 'classnames';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Icon, Input, Loading } from '@components';

import { auth, db } from '@config';

import { emailRegexp } from '@constants';
import { useWindowSize } from '@hooks';

export const SignUp = () => {
  const router = useRouter();

  const { height } = useWindowSize();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await setDoc(doc(db, 'User', auth.currentUser.uid), {
          email,
          firstName,
          lastName,
          emotion: [],
          emotionalChat: [],
          funChat: [],
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Signup failed');
      router.push('/');
    }
  };

  const firstButtonDisabled = !firstName.length || !lastName.length;
  const secondButtonDisabled =
    !email.length || !password.length || password.length < 6 || !emailRegexp.test(email);

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSignUp}>
      <div className='h-100 w-full bg-white' />
      <div
        className='bg-primary-200 pt-30 px-50 relative h-full flex-col items-center justify-between rounded-tr-[50px] bg-opacity-50'
        style={{
          minHeight: height - 100,
        }}>
        <div className='text-grey-2 text-AX1-Caption2 mb-9 text-center'>Sign up</div>
        {page === 0 ? (
          <>
            <div>
              <div className='text-grey-2 text-AX1-Subhead w-full text-center'>
                What's your name?
              </div>
              <div className='mt-50 flex w-full flex-col justify-center gap-40'>
                <Input
                  label='First Name'
                  type='text'
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <Input
                  label='Last Name'
                  type='text'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-50 flex w-full justify-end'>
              <button
                onClick={() => setPage(2)}
                disabled={firstButtonDisabled}
                className='disabled:bg-primary-bg disabled:border-grey-1 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34 rounded-[50px] border-[2px] py-9 pl-40 disabled:border-opacity-0 disabled:bg-opacity-30'>
                <div className='flex flex-row items-center'>
                  <div
                    className={classNames(
                      firstButtonDisabled ? 'text-primary-200 text-opacity-50' : 'text-grey-6',
                    )}>
                    Next
                  </div>
                  <Icon
                    icon='RightDirection'
                    size={40}
                    color={firstButtonDisabled ? 'primary-200-opacity-30' : 'grey-6'}
                  />
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className='text-grey-2 text-AX1-Subhead w-full text-center'>
                What's your email and password?
              </div>
              <div className='mt-50 flex w-full flex-col justify-center gap-40'>
                <Input
                  label='EMAIL'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  message={!emailRegexp.test(email) ? 'Email must be valid' : 'Email is now valid'}
                />
                <Input
                  label='PASSWORD'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  message={
                    password.length < 6
                      ? 'Password must be at least 6 characters'
                      : 'Password is now valid'
                  }
                />
              </div>
            </div>
            <div className='mt-100 flex w-full justify-end'>
              <button
                type='submit'
                disabled={secondButtonDisabled}
                className='disabled:bg-primary-bg disabled:border-grey-1 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34  rounded-[50px] border-[2px] py-9 pl-40 disabled:border-opacity-0 disabled:bg-opacity-30'>
                <div className='flex flex-row items-center'>
                  <div
                    className={classNames(
                      secondButtonDisabled ? 'text-primary-200 text-opacity-50' : 'text-grey-6',
                    )}>
                    Sign up
                  </div>
                  <Icon
                    icon='RightDirection'
                    size={40}
                    color={secondButtonDisabled ? 'primary-200-opacity-30' : 'grey-6'}
                  />
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};
