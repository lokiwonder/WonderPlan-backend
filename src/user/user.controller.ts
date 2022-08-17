import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CREATE_USER_API,
  READ_USER_API,
  USER_API,
} from 'src/_commons/constants/api-end-point';
import { ReadUserDTO } from './dto';
import CreateUserDTO from './dto/Create-User.dto';
import { UserService } from './user.service';

@Controller(USER_API)
export class UserController {
  constructor(private userService: UserService) {}

  // function: 사용자 정보를 Body로 받아 새로운 유저를 생성 //
  // arg: userEmail, userName, userProfile, userBirth, userTel, companyNumber?: string = null //
  // return : userData + accessToken //
  // todo: 반환타입 작성하기 //
  @Post(CREATE_USER_API)
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  // function : userEmail로 유저 조회 //
  // arg: userEmail //
  // return : user //
  // todo: 반환타입 작성하기 //
  @Get(`${READ_USER_API}/:userEmail`)
  @UsePipes(ValidationPipe)
  readUser(@Param('userEmail') readUserDto: ReadUserDTO) {
    return this.userService.readUser(readUserDto.userEmail);
  }
}
