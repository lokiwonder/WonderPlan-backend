import { WorkingStatus } from 'src/_commons/classes';
import ICommute from 'src/_commons/interfaces/Commute.interface';

export const getWorkingStatus = (commuteList: ICommute[]): WorkingStatus => {
  if (!commuteList.length) {
    return WorkingStatus.LEAVEWORK;
  }
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const time = now.toISOString().slice(11, 16);
  const commute = commuteList.find((commute) => {
    return commute.startTime >= time && commute.endTime <= time;
  });
  return commute.workingStatus;
};
