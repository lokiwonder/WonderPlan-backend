import { ICommutingTime } from './CommutingTime.interface';
import { IGeo } from './Geo.interface';

export interface ICompany {
  businessRegistrationNumber: string;

  companyName: string;

  representativeName: string;

  companyOpeningDate: string;

  companyAddress: string;

  companyLocation: IGeo;

  commutingTime: ICommutingTime;
}
