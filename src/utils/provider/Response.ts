import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { LOGIC_STATUS } from '@/constants/common';

@Injectable()
class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    return next.handle().pipe(
      map((data) => ({
        code: LOGIC_STATUS.SUCCESS,
        data,
      })),
    );
  }
}

export const ResponseProVider = {
  provide: APP_INTERCEPTOR,
  useClass: ResponseInterceptor,
};
