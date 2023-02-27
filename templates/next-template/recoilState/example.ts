import { atom } from 'recoil';

export const windowSizeState = atom<{
  width: number;
  height: number;
}>({
  key: 'windowSizeState',
  default: {
    width: 0,
    height: 0,
  },
});
