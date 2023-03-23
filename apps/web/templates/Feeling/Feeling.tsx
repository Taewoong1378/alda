import { useState } from 'react';

import { convertDateToYYYYMMDD, convertTimestampToDate } from '@util';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Icon } from '@components';
import { getFormattedDate } from '@templates/Home/util';

import { HEADER_HEIGHT } from '@constants';
import { useGetProfile, useWindowSize } from '@hooks';

export const Feeling = ({ date }: { date: string }) => {
  const router = useRouter();

  const { user } = useGetProfile();
  const { width } = useWindowSize();

  const [isSelected, setIsSelected] = useState(false);

  const emotion = user?.emotion.find(
    v => convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) === date,
  );

  const chat = user?.emotionalChat.find(
    v => convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) === date,
  );

  const Header = () => {
    return (
      <div
        className='px-30 bg-primary-100 fixed z-50 flex w-full items-center justify-between rounded-bl-[25px] py-8'
        style={{
          width: width > 600 ? 598 : width,
          height: HEADER_HEIGHT + 30,
        }}>
        <div className='cursor-pointer' onClick={() => router.back()}>
          <Icon icon='LeftDirection' size={25} color='primary-bg' />
        </div>
        <div>
          <span className='text-AX1-Caption2 text-grey-3'>Today is</span>&nbsp;&nbsp;
          <span className='text-AX1-Subhead text-grey-3'>
            {`${getFormattedDate(new Date(date)).split(' ')[0]}
            ${getFormattedDate(new Date(date)).split(' ')[1]}`}
          </span>
        </div>
        <div />
      </div>
    );
  };

  const ChipLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className='border-grey-6 rounded-[45px] border-[2px] px-14 py-6'>{children}</div>;
  };

  const Keyword = () => {
    if (!emotion) return null;

    return (
      <div
        className='border-secondary-101 bg-primary-bg mt-22 flex h-[340px] w-full flex-col items-center justify-center rounded-[25px] border-[2px] bg-opacity-30'
        onClick={() => setIsSelected(!isSelected)}>
        <div className='mb-50 text-secondary-101 text-AX1-Subhead'>Keyword</div>
        <div className='gap-13 flex flex-row flex-wrap items-center'>
          <ChipLayout>{emotion.big}</ChipLayout>
          {emotion.small.map(v => {
            return <ChipLayout>{v}</ChipLayout>;
          })}
        </div>
      </div>
    );
  };

  const ChatSummary = () => {
    return (
      <div className='border-secondary-101 p-27 mt-22 relative mx-auto h-[300px] w-[300px] rounded-[25px] border-[2px]'>
        <div className='text-AX1-Subhead text-secondary-101 text-center'>Emotional</div>
        <div className='text-AX1-Subhead text-secondary-101 text-center'>Chatting Summary</div>
        <div className='text-AX1-Caption2 mt-20 text-center'>We talked about...</div>
        <div className='mt-20 flex w-full flex-row items-center justify-between gap-20'>
          <div className='gap-15 flex w-full flex-col'>
            {chat?.summary.map((v, i) => {
              return (
                <div
                  key={i}
                  className='border-secondary-101 text-AX1-Caption1 rounded-[30px] border-[2px] text-center'>
                  {v}
                </div>
              );
            })}
          </div>
          <img
            width={90}
            height={90}
            src='/full-chat.png'
            className='cursor-pointer'
            onClick={() => router.push(`/chat-summary?date=${date}`)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        className='px-28 pb-40'
        style={{
          paddingTop: HEADER_HEIGHT + 50,
        }}>
        <div className='border-secondary-101 relative mx-auto h-[300px] w-[300px] rounded-[25px] border-[2px]'>
          <Image
            src={chat?.image ?? '/no-image.jpeg'}
            width={300}
            height={300}
            layout='responsive'
            className='rounded-[23px]'
          />
        </div>
        <Keyword />
        <ChatSummary />
      </div>
    </>
  );
};
