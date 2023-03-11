import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { isUserRefusedLocationPermissionState, locationState } from '@recoilState';
import { isAppApproaching } from '@util';

export const useGetLocation = () => {
  const [myLocation, setMyLocation] = useRecoilState(locationState);
  const [isUserRefusedLocationPermission, setIsUserRefusedLocationPermission] = useRecoilState(
    isUserRefusedLocationPermissionState,
  );

  const isAppApproach = isAppApproaching();

  const resetLocation = () => {
    getLocation();
  };

  const getAppLocation = async (e: any) => {
    const { latitude, longitude, isLocationDenied } = e.detail.location;
    if (!latitude || !longitude || isLocationDenied) {
      setIsUserRefusedLocationPermission(true);
      setMyLocation({
        latitude: 37.5172,
        longitude: 127.0473,
      });
      return;
    }

    if (myLocation === null) {
      setMyLocation({
        latitude,
        longitude,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('receiveCurrentLocation', getAppLocation);
    }
    return () => {
      window.removeEventListener('receiveCurrentLocation', getAppLocation);
    };
  }, []);

  useEffect(() => {
    if (isAppApproach) return;
    if (myLocation === null && !isUserRefusedLocationPermission) {
      getLocation();
    }
  }, [myLocation, isUserRefusedLocationPermission, isAppApproach]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setMyLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      //  실패시 (유저가 위치 공유를 거부했을 경우.)
      () => {
        setIsUserRefusedLocationPermission(true);
        setMyLocation({
          latitude: 37.5172,
          longitude: 127.0473,
        });
      },
    );
  };

  return { myLocation, resetLocation };
};
