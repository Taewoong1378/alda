import { atom } from 'recoil';

export const weatherState = atom<string | undefined>({
  key: 'weatherState',
  default: undefined,
});
