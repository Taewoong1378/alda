type Messages = {
  role: 'user' | 'system';
  content: string;
}[];

interface Chat {
  createdAt?: Date;
  user: string;
  messages: Messages;
}

interface ChatRequest {
  user_id: string;
  userfeeling_big: Mood;
  userfeeling_small: (
    | HappyDetail
    | OrdinaryDetail
    | ScaredDetail
    | SadDetail
    | DepressedDetail
    | AngryDetail
  )[];
  lang: 'ko' | 'eng';
}

interface ChatResponse {
  role: 'system';
  content: string;
}
