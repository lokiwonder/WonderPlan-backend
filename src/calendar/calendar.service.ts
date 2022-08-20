import { Injectable } from '@nestjs/common';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { User } from 'src/data-access/schemas';
import ICommute from 'src/_commons/interfaces/Commute.interface';

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
  // arg      : User - 사용자 정보, workingStatus - 근무 상태 //
  // return   :  //
  // async createSchedule(user: User) {
  //   const { userEmail } = user;

  // }
}
