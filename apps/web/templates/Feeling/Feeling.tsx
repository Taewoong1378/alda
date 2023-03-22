import Image from 'next/image';
import { useRouter } from 'next/router';

import { Icon } from '@components';
import { getFormattedDate } from '@templates/Home/util';

import { HEADER_HEIGHT } from '@constants';
import { useWindowSize } from '@hooks';

export const Feeling = ({ date }: { date: string }) => {
  const router = useRouter();

  const { width } = useWindowSize();

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

  return (
    <>
      <Header />
      <div
        className='px-28'
        style={{
          paddingTop: HEADER_HEIGHT + 50,
        }}>
        <Image
          src='/happy.jpg'
          width={300}
          height={300}
          layout='responsive'
          className='rounded-[23px]'
        />
      </div>
    </>
  );
};
