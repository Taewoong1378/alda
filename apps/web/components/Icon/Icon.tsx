import { Colors } from '@styles';

import BottomChattingOff from '../../assets/icon/bottom-chatting-off.svg';
import BottomChattingOn from '../../assets/icon/bottom-chatting-on.svg';
import BottomHomeOff from '../../assets/icon/bottom-home-off.svg';
import BottomHomeOn from '../../assets/icon/bottom-home-on.svg';
import BottomRecordingOff from '../../assets/icon/bottom-recording-off.svg';
import BottomRecordingOn from '../../assets/icon/bottom-recording-on.svg';
import BottomSettingsOff from '../../assets/icon/bottom-settings-off.svg';
import BottomSettingsOn from '../../assets/icon/bottom-settings-on.svg';
import Home from '../../assets/icon/home.svg';
import LeftDirection from '../../assets/icon/left-direction.svg';
import RightDirection from '../../assets/icon/right-direction.svg';

export const image = {
  BottomChattingOn,
  BottomChattingOff,
  BottomHomeOn,
  BottomHomeOff,
  BottomRecordingOn,
  BottomRecordingOff,
  BottomSettingsOn,
  BottomSettingsOff,
  Home,
  LeftDirection,
  RightDirection,
};

export type IconType = keyof typeof image;

export interface IconProps {
  icon: IconType;
  color?: keyof typeof Colors;
  size: number;
  width?: number;
  height?: number;
}

export const Icon = ({ icon, size, color = 'white', width, height }: IconProps) => {
  const SvgIcon = image[icon];
  const renderIcon = () => {
    return (
      <>
        <SvgIcon width={width ?? size} height={height ?? size} fill={Colors[color]} />
        <style jsx>{`
          svg {
            width: ${size}px;
            height: ${size}px;
            viewbox: 0 0 ${size} ${size};
          }

          path {
            fill: ${Colors[color]};
            storke: ${Colors[color]};
          }
        `}</style>
      </>
    );
  };

  return <>{renderIcon()}</>;
};
