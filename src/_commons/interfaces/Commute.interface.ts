import { WorkingStatus } from '../classes';

export default interface ICommute {
  userEmail: string;

  businessRegistrationNumber: string;

  date: string;

  startTime: string;

  endTime: string;

  workingStatus: WorkingStatus;

  description: string;
}
