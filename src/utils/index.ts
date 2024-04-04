import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const getDateToString = (date: any) => {
  if (typeof date === 'string') {
    return date.replaceAll('/', '-');
  }
  return date;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any =>
    context.switchToHttp().getRequest().user,
);

export const CurrentUserAgent = createParamDecorator(
  (data: unknown, context: ExecutionContext): any =>
    context.switchToHttp().getRequest().headers['user-agent'] || '',
);
