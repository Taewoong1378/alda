import { useGetLocation } from '@hooks';

export const Home = () => {
  useGetLocation();

  return <div>Home</div>;
};
