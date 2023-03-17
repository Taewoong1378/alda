export const detailMood = {
  Happy: {
    mood: 'Happy',
    detail: ['Joy', 'Excited', 'Love', 'Gleeful', 'Pleasant'],
  },
  Ordinary: {
    mood: 'Ordinary',
    detail: ['Leisurely', 'Warm', 'Satisfying', 'Comfortable', 'Reassuring'],
  },
  Scared: {
    mood: 'Scared',
    detail: ['Heartbroken', 'Sorrowful', 'Empty', 'Lonely', 'Desolate'],
  },
  Sad: {
    mood: 'Sad',
    detail: ['Exhausted', 'Regretful', 'Disheartened', 'Depressed', 'Ashamed'],
  },
  Depressed: {
    mood: 'Depressed',
    detail: ['Fearful', 'Anxious', 'Painful', 'Unimaginable', 'Unstable'],
  },
  Angry: {
    mood: 'Angry',
    detail: ['Indignant', 'Betrayed', 'Hateful', 'Irritated', 'Jealous'],
  },
} as const;

export const moodArr = [
  {
    id: 0,
    text: 'Happy',
  },
  {
    id: 1,
    text: 'Ordinary',
  },
  {
    id: 2,
    text: 'Scared',
  },
  {
    id: 3,
    text: 'Sad',
  },
  {
    id: 4,
    text: 'Depressed',
  },
  {
    id: 5,
    text: 'Angry',
  },
] as const;
