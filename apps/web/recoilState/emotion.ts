import { atom } from 'recoil';

import { localStorageEffect } from '@util';

export const emotionState = atom<Emotion>({
  key: 'emotionState',
  default: undefined,
  effects: [localStorageEffect('emotionInfo')],
});
