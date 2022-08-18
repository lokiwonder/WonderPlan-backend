import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { DataAccessModule } from './data-access/data-access.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_SECRET,
  JWT_SIGN_OPTOINS,
  MONGODB_URL,
  PASSPORT_STRATEGY,
} from './_commons/constants';

import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    DataAccessModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(MONGODB_URL),
    PassportModule.register(PASSPORT_STRATEGY),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: JWT_SIGN_OPTOINS,
    }),
    DataAccessModule,
    ConfigService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
