export const getFormattedDate = (date: Date): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const suffix = getOrdinalSuffix(dayOfMonth);
  return `${month} ${dayOfMonth}${suffix} ${dayOfWeek}`;
};

export const getOrdinalSuffix = (n: number): string => {
  if (n >= 11 && n <= 13) {
    return 'th';
  }
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getWeek = (): Date[] => {
  const now = new Date();
  const week: Date[] = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    week.push(date);
  }
  return week;
};

export const getDateAndDay = (str: string): [number, string] => {
  const [_, date, day] = str.split(' ');
  const numericDate = parseInt(date.replace(/\D/g, ''));
  return [numericDate, day];
};
