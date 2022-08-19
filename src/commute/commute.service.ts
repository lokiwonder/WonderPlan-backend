import { Injectable } from '@nestjs/common';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { User } from 'src/data-access/schemas';
import { GO_TO_WORK } from './constant';
import {
  canLeaveWork,
  generateCommuteRecord,
  getCommuteDateTime,
} from './function';

// service : 출퇴근 처리 API Service //
@Injectable()
export class CommuteService {
  constructor(private commuteRepository: CommuteRepository) {}

  // function : 사용자 출퇴근 처리 //
  // arg      : User - 사용자 //
  // return   : boolean - 출퇴근 정상 처리 여부 //
  async recordWork(user: User): Promise<boolean> {
    // description : api 호출 시 날짜 및 시간 //
    const commuteDateTime = getCommuteDateTime();
    const { commuteDate } = commuteDateTime;

    const commuteList = await this.commuteRepository.readTodaysRecords(
      user,
      commuteDate,
    );

    // description : 해당 날짜에 대한 기록이 존재할 때 //
    if (commuteList.length) {
      if (canLeaveWork(commuteList[0]))
        await this.commuteRepository.updateRecordToLeave(user, commuteDateTime);
    }
    // description : 해당 날짜에 대한 기록이 없을 때 //
    else {
      const commuteRecord = generateCommuteRecord(
        user,
        commuteDateTime,
        GO_TO_WORK,
      );
      await this.commuteRepository.createAttendanceRecord(commuteRecord);
    }
    return true;
  }
}
