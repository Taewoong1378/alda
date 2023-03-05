import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { isLoggedInState } from '@recoilState';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { Input } from '@components';

import { auth } from '@config';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <Input label='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
      <Input
        label='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
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
      <button type='submit'>Sign up</button>
    </form>
  );
};
