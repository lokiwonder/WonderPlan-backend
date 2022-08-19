import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UTC_KST_DIFFERENCE } from 'src/commute/constant';
import { ICommuteDateTime } from 'src/commute/interface';
import { IWorkingStatus } from 'src/_commons/interfaces';
import ICommute from 'src/_commons/interfaces/Commute.interface';
import { Commute, User } from './schemas';
import { CommuteDocument } from './schemas/commute.schema';

@Injectable()
export class CommuteRepository {
  constructor(
    @InjectModel(Commute.name)
    private commuteModel: Model<CommuteDocument>,
  ) {}

  // function : 당일의 출퇴근 기록 조회 //
  // arg      : User - 사용자 정보 //
  // return   : ICommute[] - 출퇴근 정보 목록(사용자 이메일, 사업자등록번호, 일자, 시작시간, 종료시간, 근무 상태, 기타사항)
  async readTodaysRecords(
    user: User,
    currentDate: string,
  ): Promise<ICommute[]> {
    const { userEmail, companyNumber } = user;
    const records = await this.commuteModel
      .find({
        $and: [{ userEmail }, { companyNumber }, { currentDate }],
      })
      .sort({ startTime: -1 })
      .exec();
    return records;
  }

  // function : 출근 기록을 퇴근으로 update //
  // arg      : User - 사용자 정보, currentDateTime - 현재 시각 //
  // return   : boolean - 수정 성공 여부 //
  async updateRecordToLeave(
    user: User,
    commuteDateTime: ICommuteDateTime,
  ): Promise<boolean> {
    const { userEmail, companyNumber } = user;
    const { commuteDate, commuteTime } = commuteDateTime;
    const workingStatus = IWorkingStatus.LEAVEWORK;
    const result = await this.commuteModel
      .updateOne(
        {
          $and: [
            { userEmail },
            { companyNumber },
            { currentDate: commuteDate },
          ],
        },
        { $set: { endTime: commuteTime, workingStatus } },
      )
      .exec();
    console.log(result);
    return result.modifiedCount === 1;
  }

  // function : 출근 기록 insert //
  // arg      : ICommute - 사용자 이메일, 사업자등록번호, 일자, 시작시간, 근무 상태 //
  // return   : Commute - 생성된 출퇴근 기록 //
  async createAttendanceRecord(commute: ICommute): Promise<ICommute> {
    const result = await this.commuteModel.create(commute);
    console.log(result);
    return result;
  }
}
