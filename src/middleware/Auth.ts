import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY, LOGIC_STATUS, JWT_CONSTANYS } from '@/constants/common';
import ErrorException from '@/utils/exception/Error';

@Injectable()
export default class AuthInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<any> {
    // 公共接口放行
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return next.handle();
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ErrorException({
        HttpStatus: HttpStatus.UNAUTHORIZED,
        code: LOGIC_STATUS.TOKEN_ERROR,
        message: 'Token 错误',
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANYS.secret,
      });
      const { username, permission } = payload;
      // const user = await this.userService.findOne(username);
      // if (!user) {
      //   throw new ErrorException({
      //     HttpStatus: HttpStatus.FORBIDDEN,
      //     code: LOGIC_STATUS.USER_ERROR,
      //     message: '当前登录用户错误',
      //   });
      // }
      // TODO permission
    } catch (error) {
      throw new ErrorException({
        HttpStatus: HttpStatus.UNAUTHORIZED,
        code: LOGIC_STATUS.TOKEN_ERROR,
        message: 'Token 错误',
      });
    }
    return next.handle().pipe();
  }
}
