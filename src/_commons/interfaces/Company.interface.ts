import { ICommutingTime } from './CommutingTime.interface';
import { IGeo } from './geo.interface';

export interface ICompany {
  businessRegistrationNumber: string;

  companyName: string;

  representativeEmail: string;

  companyOpeningData: string;

  companyAddress: string;

  companyLocation: IGeo;

  commutingTime: ICommutingTime;
}
