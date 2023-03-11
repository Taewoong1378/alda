import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { Button, Chip, Header, Loading } from '@components';

import { useGetLocation } from '@hooks';

interface QuestionBubbleProps {
  question: string;
}

const detailMood = {
  Happy: {
    mood: 'Happy',
    detail: ['Joy', 'Excited', 'Love', 'Gleeful', 'Pleasant'],
  },
  Ordinary: {
    mood: 'Ordinary',
    detail: [],
  },
  Scared: {
    mood: 'Scared',
    detail: [],
  },
  Sad: {
    mood: 'Sad',
    detail: [],
  },
  Depressed: {
    mood: 'Depressed',
    detail: [],
  },
  Angry: {
    mood: 'Angry',
    detail: [],
  },
};

const moodArr = [
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

const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className='bg-primary-100 text-AX1-Subhead w-full rounded-[25px] rounded-tl-none border-[2px] pt-28 pb-56 pl-28'>
      {question}
    </div>
  );
};

export const EmotionalChat = () => {
  const { myLocation } = useGetLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] = useState<string>();

  const [selectedMoodChip, setSelectedMoodChip] = useState<keyof typeof detailMood>();
  const [selectedDetailMoodChip, setSelectedDetailMoodChip] = useState<string[]>([]);

  const handleClick = useCallback(
    (v: string) => {
      if (selectedDetailMoodChip.includes(v)) {
        setSelectedDetailMoodChip(selectedDetailMoodChip.filter(vv => vv !== v));
      } else {
        setSelectedDetailMoodChip([...selectedDetailMoodChip, v]);
      }
    },
    [selectedDetailMoodChip],
  );

  const getWeather = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation?.latitude}&lon=${myLocation?.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`,
    );
    return data;
  };

  useEffect(() => {
    if (myLocation) {
      getWeather().then(data => {
        setCurrentWeather(data.weather[0].main);
        setIsLoading(false);
      });
    }
  }, [myLocation]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header title='Emotional Chat' />
      <div className='px-27 center flex h-[calc(100%-100px)] flex-col'>
        <QuestionBubble question={`It's ${currentWeather} today. How was your feeling?`} />
        {/* {detailMood[selectedMoodChip].detail.map(v => {
              return (
                <Chip
                  key={v}
                  text={v}
                  onClick={() => handleClick(v)}
                  isSelected={selectedDetailMoodChip.includes(v)}
                />
              );
            })} */}
        <div className='flex flex-row flex-wrap items-center gap-10'>
          {moodArr.map(v => {
            return (
              <Chip
                key={v.id}
                text={v.text}
                onClick={() => {
                  setSelectedMoodChip(v.text);
                  setSelectedDetailMoodChip([]);
                }}
                isSelected={v.text === selectedMoodChip}
              />
            );
          })}
        </div>
        <div className='absolute bottom-60'>
          <Button text='Next' disabled={!selectedMoodChip} />
        </div>
      </div>
    </>
  );
};
