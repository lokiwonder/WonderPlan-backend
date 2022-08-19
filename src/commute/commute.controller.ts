import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/data-access/schemas';
import { PASSPORT_DEFAULT_STRATEGY } from 'src/_commons/constants';
import {
  COMMUTE_API,
  // END_WORK_API,
  RECORD_WORK_API,
} from 'src/_commons/constants/api-end-point';
import { GetUser } from 'src/_commons/decorators';
import { CommuteService } from './commute.service';

// controller : 출퇴근 기록 API Controller //
@Controller(COMMUTE_API)
@UseGuards(AuthGuard(PASSPORT_DEFAULT_STRATEGY))
export class CommuteController {
  constructor(private commuteService: CommuteService) {}

  // router : 출퇴근 처리 API //
  // todo : 반환타입 지정하기 //
  @Post(RECORD_WORK_API)
  @UsePipes(ValidationPipe)
  async recordWork(@GetUser() user: User): Promise<{ result: boolean }> {
    const result = await this.commuteService.recordWork(user);
    return { result };
  }

  // // description : 퇴근 처리 API //
  // // todo : DTO, 로직 작성 //
  // @Patch(END_WORK_API)
  // async endWork(@GetUser() user: User, @Body() dto: RecordWorkDTO) {}
}
