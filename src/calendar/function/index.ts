// export const getStartDateTime = (startDateTime: string) => {

// }

export const getRequestDateTimeString = () => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date.toISOString();
};

export const isToday = (startDateTime: string) => {
  const now = new Date();
  now.setHours(now.getHours() + 9);

  const targetDate = new Date(startDateTime);
  targetDate.setHours(targetDate.getHours() + 9);

  return (
    now.toISOString().slice(0, 10) === targetDate.toISOString().slice(0, 10)
  );
};

export const getScheduleDateTime = (dateTime: string) => {
  const dateTimeObject = new Date(dateTime);
  dateTimeObject.setHours(dateTimeObject.getHours() + 9);

  const date = dateTimeObject.toISOString().slice(0, 10);
  const time = dateTimeObject.toISOString().slice(11, 16);

  return { date, time };
};
