import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

// module //
// controller //
// service //
// repository //
// schema //

// variable //
// function //
// class //
// interface //

//   arg  : //
// return : //

// description //
// -           //

@Module({
  imports: [AuthModule, UserModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
