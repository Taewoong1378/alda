import { useSetRecoilState } from 'recoil';

import { weatherState } from '@recoilState';
import { useRouter } from 'next/router';

import { EmotionalChat } from '@templates';

import { useGetLocation, useWindowSize } from '@hooks';

export default function EmotionalChatPage() {
  const router = useRouter();

  const setWeather = useSetRecoilState(weatherState);

  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const { myLocation } = useGetLocation();
  const { height } = useWindowSize();

  const hasChatInfo = router.query.hasChatInfo as string;

  // const getWeather = async () => {
  //   const { data } = await axios.get(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation?.latitude}&lon=${myLocation?.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`,
  //   );
  //   return data;
  // };

  // useEffect(() => {
  //   if (myLocation) {
  //     getWeather().then(data => {
  //       setWeather(data.weather[0].main);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [myLocation]);

  // if (isLoading) return <Loading />;

  return (
    <>
      <main
        className='bg-primary-bg'
        style={{
          height,
        }}>
        <EmotionalChat hasChatInfo={hasChatInfo ? JSON.parse(hasChatInfo) : false} />
      </main>
    </>
  );
}
