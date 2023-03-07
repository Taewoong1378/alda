import React, { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { Input, Loading } from '@components';

import { auth, db } from '@config';

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        await updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        });

        await setDoc(doc(db, 'User', auth.currentUser.uid), {
          email,
          firstName,
          lastName,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSignUp} className='px-30 pt-30'>
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
