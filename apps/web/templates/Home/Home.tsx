import { useState } from 'react';

import { convertDateToYYYYMMDD, convertTimestampToDate } from '@util';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { useGetLocation, useGetProfile } from '@hooks';

import { DateButton } from './components';
import { getFormattedDate, getWeek } from './util';

export const Home = () => {
  const router = useRouter();

  const { user } = useGetProfile();
  useGetLocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const emotionalChat = user?.emotionalChat.find(
    v =>
      convertDateToYYYYMMDD(convertTimestampToDate(v.createdAt)) ===
      convertDateToYYYYMMDD(selectedDate),
  );

  return (
    <>
      <div className='bg-primary-100 py-30 relative w-full rounded-bl-[50px] px-16'>
        <div className='text-center'>
          <span className='text-AX1-Caption2'>
            {selectedDate.getDate() === new Date().getDate() ? 'Today is' : 'Looking at'}
          </span>
          &nbsp;
          <span className='text-AX1-Subhead'>{getFormattedDate(selectedDate)}</span>
        </div>
        <hr className='bg-grey-3 mt-6 h-1 w-full' />
        <div className='flex h-[150px] w-full items-center justify-center gap-8'>
          {getWeek().map((v, i) => {
            return (
              <DateButton
                key={i}
                date={getFormattedDate(v)}
                onClick={() => {
                  setSelectedDate(v);
                }}
                isSelected={v.getDate() === selectedDate.getDate()}
              />
            );
          })}
        </div>
      </div>
      <div className='my-30 px-28'>
        <div
          className={classNames(
            'border-secondary-101 relative mx-auto h-[300px] w-[300px] rounded-[25px] border-[2px]',
            emotionalChat?.image ? 'cursor-pointer' : 'pointer-events-none',
          )}
          onClick={() => {
            if (!emotionalChat?.image) return;

            return router.push(`/feeling?date=${convertDateToYYYYMMDD(selectedDate)}`);
          }}>
          {emotionalChat?.image ? (
            <img src={emotionalChat.image} width={300} height={300} className='rounded-[23px]' />
          ) : (
            <img
              src='/no-data.png'
              width={200}
              height={200}
              className='mx-auto mt-20 rounded-[23px]'
            />
          )}
          <div className='absolute top-0 h-full w-full rounded-[25px] bg-[rgba(248,247,243,0.3)] blur-[2px] backdrop-filter' />
          <div
            className={classNames(
              'text-secondary-101 font-SFPro absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[28px] font-semibold',
              emotionalChat?.image ? 'bottom-50' : 'bottom-30',
            )}>
            {emotionalChat?.image ? "Today's Feeling" : 'No Chatting Found'}
          </div>
        </div>
      </div>
    </>
  );
};
