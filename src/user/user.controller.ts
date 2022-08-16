import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CREATE_USER_API,
  READ_USER_API,
  USER_API,
} from 'src/_commons/constants/api-end-point';
import { UserService } from './user.service';

@Controller(USER_API)
export class UserController {
    constructor(private userService: UserService) {}

    // todo: need to define DTO, response Type //
    // userEmail, userName, userProfile, userBirth, userTel, companyNumber?: string = null -> userData + accessToken //
    @Post(CREATE_USER_API)
    createUser(@Body() ) {
        return this.userService.createUser();
    }

    // todo: need to define response Type //
    // need to modify notion description Error: 400 //
    @Get(`${READ_USER_API}/:email`)
    readUser(@Param("email") email: string) {
        return this.userService.readUser(email);
    }
}
