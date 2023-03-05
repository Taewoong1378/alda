import { Colors } from '@styles';

import BottomChattingOn from '../../assets/icon/bottom-chatting-on.svg';

export const image = {
  BottomChattingOn,
};

export type IconType = keyof typeof image;

export interface IconProps {
  icon: IconType;
  color?: keyof typeof Colors;
  hasBackground?: {
    backgroundColor?: keyof typeof Colors;
    borderRadius?: number;
    size: number;
  };
  size: number;
  width?: number;
  height?: number;
}

export const Icon = ({ icon, size, color = 'white', hasBackground, width, height }: IconProps) => {
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

  if (hasBackground) {
    const { backgroundColor, borderRadius, size } = hasBackground;

    const backgroundStyle = {
      width: size,
      height: size,
      borderRadius: borderRadius || '50%',
      backgroundColor: Colors[backgroundColor || 'yellow'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return <div style={backgroundStyle}>{renderIcon()}</div>;
  } else {
    return <>{renderIcon()}</>;
  }
};
