import { atom } from 'recoil';

import { localStorageEffect } from '@util';

import { Storage } from '@constants';

export const emotionalChatState = atom<Chat>({
  key: 'emotionalChatState',
  default: {
    createdAt: new Date(),
    user: '',
    messages: [],
  },
  effects: [localStorageEffect(Storage.EMOTIONAL_CHAT)],
});

export const smallFunChatState = atom<Chat>({
  key: 'smallFunChatState',
  default: {
    createdAt: new Date(),
    user: '',
    messages: [],
  },
  effects: [localStorageEffect(Storage.SMALL_FUN_CHAT)],
});
