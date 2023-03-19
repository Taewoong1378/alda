import axios from 'axios';

import { BACKEND_URL } from '@constants';

export const getChatResponse = async (data: ChatRequest): Promise<ChatResponse> => {
  const result: ChatResponse = await axios.post(`${BACKEND_URL}/emotion `, {
    data,
  });

  return result;
};
