import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useGetLocation } from '@hooks';

import { DateButton } from './components';
import { getFormattedDate, getWeek } from './util';

export const Home = () => {
  const router = useRouter();

  useGetLocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // TODO: 날짜가 변함에 따라 쿼리 요청을 보내고 이미지가 바뀌어야 함

  return (
    <>
      <div className='px-27 bg-primary-100 py-30 relative w-full rounded-bl-[50px]'>
        <div className='text-center'>
          <span className='text-AX1-Caption2'>Today is</span>&nbsp;
          <span className='text-AX1-Subhead'>{getFormattedDate(new Date())}</span>
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
      <div className='mt-50 px-28'>
        <div
          className='border-secondary-101 relative cursor-pointer rounded-[25px] border-[2px]'
          onClick={() => router.push('/feeling')}>
          <Image
            src='/happy.jpg'
            width={300}
            height={300}
            layout='responsive'
            className='rounded-[23px]'
          />
          <div className='absolute top-0 h-full w-full rounded-[25px] bg-[rgba(248,247,243,0.3)] blur-[2px] backdrop-filter' />
          <div className='text-secondary-101 bottom-50 font-SFPro absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[28px] font-semibold'>
            Today's Feeling
          </div>
        </div>
      </div>
    </>
  );
};
