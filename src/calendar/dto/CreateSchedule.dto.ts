import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { WorkingStatus } from 'src/_commons/classes';

export default class CreateScheduleDTO {
  @IsString()
  @IsNotEmpty()
  workingStatus: WorkingStatus;

  @IsNotEmpty()
  @IsDateString()
  startDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDateTime: string;
}
