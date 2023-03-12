import { useState } from 'react';

import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Icon, Input, Loading, Portal } from '@components';

import { auth } from '@config';

import { emailRegexp } from '@constants';
import { useWindowSize } from '@hooks';

export const Login = () => {
  const router = useRouter();

  const { width, height } = useWindowSize();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordResetEmail, setPasswordResetEmail] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoginLoading(true);
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/').then(() => setIsLoginLoading(false));
    } catch (error) {
      alert('Invalid email or password');
      setIsLoginLoading(false);
    }
  };

  const disabled =
    email === '' || password === '' || password.length < 6 || !emailRegexp.test(email);

  if (isLoginLoading) return <Loading />;

  return (
    <form onSubmit={handleLogin}>
      <div
        className='px-49 bg-primary-100 py-30 relative flex flex-col items-center rounded-bl-[50px] bg-opacity-50'
        style={{
          minHeight: height - 300,
        }}>
        <div
          className='w-30 h-30 absolute top-16 left-16 cursor-pointer'
          onClick={() => router.push('/')}>
          <Icon icon='LeftDirection' size={26} color='black' />
        </div>
        <div className='text-grey-2 text-AX1-Caption2 mb-20'>Log in</div>
        <Image src='/Logo.png' width={60} height={60} layout='fixed' alt='alda-logo' />
        <div className='gap-35 mt-40 flex w-full flex-col'>
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
        <div
          className='mt-40 flex w-full cursor-pointer justify-center'
          onClick={() => setModalVisible(true)}>
          <Image src='/exclamation-mark.png' width={30} height={30} layout='fixed' />
          <div className='ml-6'>
            <div className='text-AX1-Subhead underline'>Forgot Password</div>
          </div>
        </div>
      </div>
      <div className='pt-27 pr-27 flex w-full justify-end'>
        <Button text='Next' type='submit' disabled={disabled} />
      </div>
      {modalVisible && (
        <Portal onClickBackground={() => setModalVisible(false)}>
          <div
            style={{
              width: width - 40,
            }}
            className='absolute-center flex justify-center'
            onClick={() => setModalVisible(false)}>
            <div
              className='shadow-1 px-42 flex w-fit flex-col items-center rounded-xl bg-white py-28'
              onClick={e => e.stopPropagation()}>
              <div className='mt-2 mb-5 text-[17px]'>Send a password reset email.</div>
              <div className='mb-8 text-[15px]'>Please enter your email</div>
              <Input
                value={passwordResetEmail}
                onChange={e => setPasswordResetEmail(e.target.value)}
              />
              <button
                className='bg-primary-100 text-T6 mt-16 rounded-lg px-16 py-5 text-yellow-600'
                onClick={() => {
                  sendPasswordResetEmail(auth, passwordResetEmail);
                  setModalVisible(false);
                  alert('Email has been sent');
                }}>
                Send
              </button>
            </div>
          </div>
        </Portal>
      )}
    </form>
  );
};
