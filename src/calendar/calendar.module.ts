import { Module } from '@nestjs/common';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [DataAccessModule],
  controllers: [CalendarController],
  providers: [CalendarService, CommuteRepository],
})
export class CalendarModule {}
