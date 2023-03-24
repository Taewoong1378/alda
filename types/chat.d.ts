type Messages = {
  role: 'user' | 'system';
  content: string;
}[];

interface EmotionalChat {
  createdAt?: Date;
  user: string;
  messages: Messages;
  image: string;
  summary: string[];
}

interface FunChat {
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
