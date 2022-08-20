import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { WorkingStatus } from 'src/_commons/classes';

export default class RecordWorkDTO {
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  currentDateTime: string;

  @IsNotEmpty()
  @IsString()
  workingStatus: WorkingStatus;
}
