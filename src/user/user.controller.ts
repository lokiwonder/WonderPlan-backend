import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/data-access/schemas';
import {
  CREATE_USER_API,
  READ_USER_API,
  REQUEST_JOIN_COMPANY_API,
  USER_API,
} from 'src/_commons/constants/api-end-point';
import { getUser } from 'src/_commons/decorators';
import { ReadUserDTO } from './dto';
import CreateUserDTO from './dto/Create-User.dto';
import { RequestJoinCompanyDTO } from './dto/Request-Join-Company.dto';
import { CreateUserRes } from './interface/CreateUserRes.interface';
import { UserService } from './user.service';

@Controller(USER_API)
export class UserController {
  constructor(private userService: UserService) {}

  // description : 사용자 정보를 Body로 받아 새로운 유저를 생성 //
  @Post(CREATE_USER_API)
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDTO): Promise<CreateUserRes> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  // description : userEmail로 유저 조회 //
  @Get(`${READ_USER_API}/:userEmail`)
  @UsePipes(ValidationPipe)
  async readUser(@Param() readUserDto: ReadUserDTO): Promise<User> {
    console.log(readUserDto);
    const user = await this.userService.readUser(readUserDto);
    console.log(user);
    return user;
  }

  // description : 회사로 가입 요청을 보냄 //
  @Post(REQUEST_JOIN_COMPANY_API)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async requestJoinCompany(
    @Body() dto: RequestJoinCompanyDTO,
    @getUser() user: User,
  ): Promise<void> {
    return this.userService.requestJoinCompany(dto, user);
  }
}
