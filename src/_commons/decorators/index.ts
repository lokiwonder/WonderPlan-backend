import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
