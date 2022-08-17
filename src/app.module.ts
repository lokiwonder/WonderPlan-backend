import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { DataAccessModule } from './data-access/data-access.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URL } from './_commons/constants';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    DataAccessModule,
    MongooseModule.forRoot(MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
