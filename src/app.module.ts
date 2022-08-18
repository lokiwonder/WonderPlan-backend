import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { DataAccessModule } from './data-access/data-access.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_SECRET,
  JWT_SIGN_OPTOINS,
  MONGODB_URL,
  PASSPORT_DEFAULT_STRATEGY,
} from './_commons/constants';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    DataAccessModule,
    MongooseModule.forRoot(MONGODB_URL),
    DataAccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule {}
