import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IWorkingStatus } from 'src/_commons/interfaces';

export default class RecordWorkDTO {
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  currentDateTime: string;

  @IsNotEmpty()
  @IsString()
  workingStatus: IWorkingStatus;
}
