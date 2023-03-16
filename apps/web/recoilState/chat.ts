import { atom } from 'recoil';

import { localStorageEffect } from '@util';

export const chatState = atom<Chat | undefined>({
  key: 'chatState',
  default: undefined,
  effects: [localStorageEffect('chatInfo')],
});
