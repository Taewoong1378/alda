import { useRouter } from 'next/router';

import { Icon } from '@components';

import { HEADER_HEIGHT } from '@constants';
import { useWindowSize } from '@hooks';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { width } = useWindowSize();

  const router = useRouter();

  return (
    <div
      className='px-30 bg-primary-bg fixed flex w-full items-center justify-between py-8 shadow-[0px_10px_60px_rgba(0,0,0,0.1)]'
      style={{
        width: width > 600 ? 598 : width,
        height: HEADER_HEIGHT,
      }}>
      <div className='cursor-pointer' onClick={() => router.back()}>
        <Icon icon='LeftDirection' size={25} color='primary-100' />
      </div>
      <div className='text-AX1-Caption2 text-grey-1'>{title}</div>
      <div className='cursor-pointer' onClick={() => router.push('/')}>
        <Icon icon='Home' size={40} color='primary-100' />
      </div>
    </div>
  );
};
