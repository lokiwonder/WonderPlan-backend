import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/data-access/schemas';
import { UserType } from '../interfaces/UserType.interface';

export const ConfirmationPersonnelAuthority = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;
    console.log('ConfirmationPersonnelAuthority - Decorator :::: ', user);

    const { userType } = user;
    if (userType !== UserType.REPRESENTATIVE) {
      throw new ForbiddenException();
    }

    return user;
  },
);

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user: User = req.user;

  return user;
});
