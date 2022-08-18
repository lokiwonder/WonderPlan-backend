import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { DataAccessModule } from './data-access/data-access.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URL } from './_commons/constants';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CompanyModule,
    DataAccessModule,
    MongooseModule.forRoot(MONGODB_URL),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
  exports: [MongooseModule],
})
export class AppModule {}
