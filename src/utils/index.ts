export const getDateToString = (date: any) => {
  if (typeof date === 'string') {
    return date.replaceAll('/', '-');
  }
  return date;
};
