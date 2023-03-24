import { atom } from 'recoil';

import { localStorageEffect } from '@util';

import { Storage } from '@constants';

export const emotionalChatState = atom<EmotionalChat>({
  key: 'emotionalChatState',
  default: {
    createdAt: new Date(),
    user: '',
    messages: [],
    image: '',
    summary: [],
  },
  effects: [localStorageEffect(Storage.EMOTIONAL_CHAT)],
});

export const smallFunChatState = atom<FunChat>({
  key: 'smallFunChatState',
  default: {
    createdAt: new Date(),
    user: '',
    messages: [],
  },
  effects: [localStorageEffect(Storage.SMALL_FUN_CHAT)],
});
