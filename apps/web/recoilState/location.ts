import { atom } from 'recoil';

export const locationState = atom<LocationType | null>({
  key: 'locationState',
  default: null,
});

export const isUserRefusedLocationPermissionState = atom<boolean>({
  key: 'isUserRefusedLocationPermissionState',
  default: false,
});
