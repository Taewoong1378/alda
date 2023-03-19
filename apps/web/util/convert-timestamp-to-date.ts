export const convertTimestampToDate = (time: any) => {
  if (!time) return time;
  let result = time;
  if (typeof time.toDate === 'function') {
    result = time.toDate();
  }
  return result as Date;
  // safe to use the function
};
