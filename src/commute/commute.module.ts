import { Module } from '@nestjs/common';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { CommuteController } from './commute.controller';
import { CommuteService } from './commute.service';

@Module({
  imports: [DataAccessModule],
  controllers: [CommuteController],
  providers: [CommuteService, CommuteRepository],
})
export class CommuteModule {}
