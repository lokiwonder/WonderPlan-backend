import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICommuteDateTime } from 'src/commute/interface';
import { WorkingStatus } from 'src/_commons/classes';
import ICommute from 'src/_commons/interfaces/Commute.interface';
import { Commute, User } from './schemas';
import { CommuteDocument } from './schemas/commute.schema';
import { Vacation, VacationDocument } from './schemas/vacation.schema';

@Injectable()
export class CommuteRepository {
  constructor(
    @InjectModel(Commute.name)
    private commuteModel: Model<CommuteDocument>,

    @InjectModel(Vacation.name)
    private vacationModel: Model<VacationDocument>,
  ) {}

  // function : 당일의 출퇴근 기록 목록 조회 //
  // arg      : User - 사용자 정보, currentDate - 오늘 일자 //
  // return   : ICommute[] - 출퇴근 정보 목록(사용자 이메일, 사업자등록번호, 일자, 시작시간, 종료시간, 근무 상태, 기타사항)
  async readTodaysRecords(
    user: User,
    currentDate: string,
  ): Promise<ICommute[]> {
    const { userEmail, companyNumber } = user;
    const records = await this.commuteModel
      .find({
        $and: [{ userEmail }, { companyNumber }, { date: currentDate }],
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
    const workingStatus = WorkingStatus.LEAVEWORK;
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

  // function : 출퇴근 혹은 일정 기록 create //
  // arg      : ICommute - 사용자 이메일, 사업자등록번호, 일자, 시작시간, 근무 상태 //
  // return   : ICommute - 생성된 출퇴근 기록 //
  async createRecord(commute: ICommute): Promise<ICommute> {
    const result = await this.commuteModel.create(commute);
    console.log(result);
    return result;
  }

  // function : 월별 일정 조회(출퇴근 제외) //
  // return   : Commute[] - 일정 조회(출퇴근 제외) //
  async readMonthSchedule(): Promise<ICommute[]> {
    const commuteList = await this.commuteModel
      .find({
        $nor: [
          { workingStatus: WorkingStatus.ATTENDANCE },
          { workingStatus: WorkingStatus.LEAVEWORK },
        ],
      })
      .exec();
    return commuteList;
  }

  // function : 기타 일정을 위한 출근기록의 endTime update //
  // arg      : User - 사용자 정보, endTime - 종료시각 //
  // return   : boolean - 수정 성공 여부 //
  async updateAttendaceEndTime(
    user: User,
    date: string,
    endTime: string,
  ): Promise<boolean> {
    const { userEmail, companyNumber } = user;
    const result = await this.commuteModel
      .updateOne(
        {
          $and: [{ userEmail }, { companyNumber }, { date }],
        },
        { $set: { endTime } },
      )
      .exec();
    console.log(result);
    return result.modifiedCount === 1;
  }
}
