import { convertSingleDigitNumberToString } from './convert-single-digit-number-to-string';

export const convertDateToYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}-${convertSingleDigitNumberToString(
    date.getMonth() + 1,
  )}-${convertSingleDigitNumberToString(date.getDate())}`;
};
