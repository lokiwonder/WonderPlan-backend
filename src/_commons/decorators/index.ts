import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/data-access/schemas';

export const getUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user: User = req.user;
  console.log('getUser - Decorator :::: ', user);
  return user;
});
