import { User } from 'src/data-access/schemas';
import { IWorkingStatus } from 'src/_commons/interfaces';
import ICommute from 'src/_commons/interfaces/Commute.interface';
import { UTC_KST_DIFFERENCE } from '../constant';
import { RecordWorkDTO } from '../dto';
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
    workingStatus !== IWorkingStatus.HALF_VACATION &&
    workingStatus !== IWorkingStatus.VACATION &&
    workingStatus !== IWorkingStatus.LEAVEWORK
  );
};

export const generateCommuteRecord = (
  user: User,
  commuteDateTime: ICommuteDateTime,
  workingStatus: string,
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
