import { Injectable } from '@nestjs/common';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { User } from 'src/data-access/schemas';
import { WorkingStatus } from 'src/_commons/classes';
import ICommute from 'src/_commons/interfaces/Commute.interface';
import CreateScheduleDTO from './dto/CreateSchedule.dto';
import {
  getRequestDateTimeString,
  getScheduleDateTime,
  isToday,
} from './function';

@Injectable()
export class CalendarService {
  constructor(private commuteRepository: CommuteRepository) {}

  // function : 월별 일정 조회 //
  // return   : 출퇴근 이외의 상태, 일자, 시작시간, 종료시간, 사용자 이메일 //
  async readMonthSchedule(): Promise<ICommute[]> {
    const commuteList = await this.commuteRepository.readMonthSchedule();
    return commuteList;
  }

  // function : 새로운 일정 생성 //
  // arg      : User - 사용자 정보, CreateScheduleDTO - 근무 상태, 시작시각, 종료시각 //
  // return   : boolean - 일정 생성 처리 여부 //
  async createSchedule(user: User, dto: CreateScheduleDTO): Promise<boolean> {
    const { workingStatus } = dto;
    if (workingStatus === WorkingStatus.OUTSIDE_WORK) {
      const result = this.createOutsideWorkSchedule(user, dto);
      return result;
    }
  }

  // function : 외근 일정 생성 //
  // arg      : User - 사용자 정보, CreateScheduleDTO - 근무 상태, 시작시각, 종료시각 //
  // return   : boolean - 일정 생성 처리 여부 //
  async createOutsideWorkSchedule(
    user: User,
    dto: CreateScheduleDTO,
  ): Promise<boolean> {
    const { userEmail, companyNumber } = user;
    const { workingStatus, startDateTime, endDateTime } = dto;
    const { date, time } = getScheduleDateTime(startDateTime);
    const commuteList = await this.commuteRepository.readTodaysRecords(
      user,
      date,
    );
    // description: 당일이면서 이미 출근 기록이 있는 경우 update //
    if (isToday(startDateTime) && commuteList.length) {
      if (commuteList[0].workingStatus === WorkingStatus.ATTENDANCE) {
        await this.commuteRepository.updateAttendaceEndTime(user, date, time);
      } else {
        return false;
      }
    }
    // description: 외근 기록 create //
    const endTime = getScheduleDateTime(endDateTime).time;
    const commute: ICommute = {
      userEmail,
      businessRegistrationNumber: companyNumber,
      date,
      startTime: time,
      endTime,
      workingStatus,
      description: null,
    };
    const createdCommute = await this.commuteRepository.createRecord(commute);

    return createdCommute ? true : false;
  }
}
