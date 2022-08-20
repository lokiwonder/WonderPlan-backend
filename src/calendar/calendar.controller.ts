import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/data-access/schemas';
import { PASSPORT_DEFAULT_STRATEGY } from 'src/_commons/constants';
import {
  CALENDAR_API,
  CREATE_SCHEDULE_API,
  READ_MONTH_SCHEDULE_API,
} from 'src/_commons/constants/api-end-point';
import { GetUser } from 'src/_commons/decorators';
import { CalendarService } from './calendar.service';

@Controller(CALENDAR_API)
@UseGuards(AuthGuard(PASSPORT_DEFAULT_STRATEGY))
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  // function : 월별 일정 조회 //
  // return   :  //
  @Get(READ_MONTH_SCHEDULE_API)
  async readMonthSchedule() {
    const commuteList = await this.calendarService.readMonthSchedule();
    console.log(commuteList);
  }

  // @Post(CREATE_SCHEDULE_API)
  // async createSchedule(@GetUser() user: User) {

  // }
}
