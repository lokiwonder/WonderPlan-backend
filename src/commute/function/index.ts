import { User } from 'src/data-access/schemas';
import { WorkingStatus } from 'src/_commons/classes';
import ICommute from 'src/_commons/interfaces/Commute.interface';
import { ICommuteDateTime } from '../interface';

export const getCommuteDateTime = () => {
  const commuteDateTime = new Date();
  commuteDateTime.setHours(commuteDateTime.getHours() + 9);

  const commuteDate = commuteDateTime.toISOString().slice(0, 10);
  const commuteTime = commuteDateTime.toISOString().slice(11, 16);

  return { commuteDate, commuteTime };
};

export const canLeaveWork = (commute: ICommute) => {
  const { workingStatus } = commute;
  return (
    workingStatus !== WorkingStatus.HALF_VACATION &&
    workingStatus !== WorkingStatus.VACATION &&
    workingStatus !== WorkingStatus.LEAVEWORK
  );
};

export const generateCommuteRecord = (
  user: User,
  commuteDateTime: ICommuteDateTime,
  workingStatus: WorkingStatus,
) => {
  const { userEmail, companyNumber } = user;
  const { commuteDate, commuteTime } = commuteDateTime;
  const commute: ICommute = {
    userEmail,
    businessRegistrationNumber: companyNumber,
    date: commuteDate,
    startTime: commuteTime,
    endTime: null,
    workingStatus,
    description: null,
  };
  return commute;
};
