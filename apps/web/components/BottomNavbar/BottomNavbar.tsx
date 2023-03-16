import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icon } from '@components/Icon';

import { BOTTOM_NAVBAR_HEIGHT } from '@constants';

const ItemArray = [
  {
    icon: <Icon icon='BottomChattingOff' size={56} />,
    activeIcon: <Icon icon='BottomChattingOn' size={56} />,
    path: '/chat/new',
    text: 'Chatting',
  },
  {
    icon: <Icon icon='BottomRecordingOff' size={56} />,
    activeIcon: <Icon icon='BottomRecordingOn' size={56} />,
    path: '/record',
    text: 'Recordings',
  },
  {
    icon: <Icon icon='BottomHomeOff' size={56} />,
    activeIcon: <Icon icon='BottomHomeOn' size={56} />,
    path: '/',
    text: 'Home',
  },
  {
    icon: <Icon icon='BottomSettingsOff' size={56} />,
    activeIcon: <Icon icon='BottomSettingsOn' size={56} />,
    path: '/settings',
    text: 'Settings',
  },
];

export const BottomNavbar = () => {
  const router = useRouter();

  const isSelectedFunc = (type: string) => {
    const pathName = router.pathname;
    if (pathName === type) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`border-t-grey-6 border-t-1 fixed bottom-0 right-1/2 z-[200] flex w-full max-w-[598px] translate-x-1/2 justify-evenly bg-[rgba(0,0,0,0.09)]`}
      style={{
        height: BOTTOM_NAVBAR_HEIGHT,
      }}>
      {ItemArray.map((item, index) => {
        const isSelected = isSelectedFunc(item.path);
        return (
          <Link href={item.path} replace key={index}>
            <div className='flex cursor-pointer flex-col items-center justify-center'>
              {isSelected ? item.activeIcon : item.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
