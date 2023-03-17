type Mood = 'Happy' | 'Ordinary' | 'Scared' | 'Sad' | 'Depressed' | 'Angry';

type HappyDetail = 'Joy' | 'Excited' | 'Love' | 'Gleeful' | 'Pleasant';
type OrdinaryDetail = 'Leisurely' | 'Warm' | 'Satisfying' | 'Comfortable' | 'Reassuring';
type ScaredDetail = 'Heartbroken' | 'Sorrowful' | 'Empty' | 'Lonely' | 'Desolate';
type SadDetail = 'Exhausted' | 'Regretful' | 'Disheartened' | 'Depressed' | 'Ashamed';
type DepressedDetail = 'Fearful' | 'Anxious' | 'Painful' | 'Unimaginable' | 'Unstable';
type AngryDetail = 'Indignant' | 'Betrayed' | 'Hateful' | 'Irritated' | 'Jealous';

interface Emotion {
  user: string;
  big: Mood;
  small: (
    | HappyDetail
    | OrdinaryDetail
    | ScaredDetail
    | SadDetail
    | DepressedDetail
    | AngryDetail
  )[];
  createdAt?: string;
}
