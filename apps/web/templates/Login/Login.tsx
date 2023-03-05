import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Icon, Input } from '@components';

import { auth } from '@config';

const emailRegexp = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
);

export const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <>
      <div className='px-49 bg-primary-100 pt-30 flex h-[80%] flex-col items-center rounded-bl-[50px] bg-opacity-50'>
        <div className='text-grey-2 text-AX1-Caption2 mb-20'>Log in</div>
        <Image src='/Logo.png' width={60} height={60} layout='fixed' alt='alda-logo' />
        <div className='gap-45 mt-40 flex w-full flex-col'>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            message={!emailRegexp.test(email) ? 'Email must be valid' : 'Email is now valid'}
          />
          <Input
            label='Password'
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
        <div className='ml-12 mt-10 flex w-full items-start'>
          <button onClick={() => router.push('/signup')}>Sign up</button>
        </div>
      </div>
      <div className='flex w-full justify-end'>
        <button
          disabled={
            email === '' || password === '' || password.length < 6 || !emailRegexp.test(email)
          }
          className='disabled:bg-grey-1 disabled:border-grey-1 mt-27 text-primary-bg mr-27 text-AX1-Subhead enabled:border-grey-6 enabled:text-grey-6 pr-34 rounded-[50px] border-[2px] bg-white py-9 pl-40 disabled:border-opacity-30 disabled:bg-opacity-30'
          onClick={handleLogin}>
          <div className='flex flex-row items-center'>
            <div>Next</div>
            <Icon icon='RightDirection' size={40} color='grey-6' />
          </div>
        </button>
      </div>
    </>
  );
};
