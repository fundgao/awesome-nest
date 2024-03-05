import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

/**
 * 1.guard 在 Module 注册，整个 controller 都被守卫
 * 2.JWT 授权登录，在 guard 里面拦截 token
 * 3.decorator 在 controller 的方法引入，选择性通行
 *
 * 如果校验 token，则也需要校验 permission
 * 如果不校验 token，则无需校验 permission
 *
 * 规范
 * 1.常量文件夹 constants
 * 2.装饰器文件夹 decorator
 * 3.守卫文件夹 guard
 * 4.环境配置文件夹 config | env
 * 5.国际化文件夹 i18n
 * 6.工具库文件夹 utils
 * 7.提交规范 husky & 代码规范 eslint
 * 8.
 *
 * JWT 登录 & 校验
 *
 * 自定义异常
 * 异常过滤器
 *
 * 日志
 *
 * 全局中间件
 * 全局守卫
 * 全局装饰器 在返回头中插入值，守卫解析该值，存在则放行
 *
 * 接口定义规范
 *
 * 查询全部 @Get()
 * 查询单个 @Get(':id')
 * 创建 @Post()
 * 更新 @Put()
 * 删除 @Delete()
 *
 * 密码 使用 argon2 加密、解密;
 *
 * 权限篇
 * 1.登录立即查询用户权限列表
 * 2.存储权限列表
 * 3.接口拦截对比权限
 *
 * 登录验证码
 * svgCaptcha
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });
  app.use(compression);
  await app.listen(3000);
}
bootstrap();
