import { Module } from '@nestjs/common';
import TypeOrmModule from './TypeOrmModule';
import User from '@/module/user/index.module';
import Role from '@/module/role/index.module';
import { TokenProvider } from '@/utils/provider/Token';
import { ResponseProVider } from '@/utils/provider/Response';

@Module({
  imports: [Role, User, TypeOrmModule],
  controllers: [],
  providers: [ResponseProVider, TokenProvider],
})
export class AppModule {}

/**
 * 1.guard 在 Module 注册，整个 controller 都被守卫
 * 2.JWT 授权登录， 在 guard 里面拦截 Token
 * 3.decorator 在 controller 的方法引入，在请求 Header 添加头信息，用于守卫通行
 *
 * 规范
 * 1.常量文件夹 constants
 * 2.装饰器文件夹 decorator
 * 3.守卫文件夹 guard
 * 4.环境配置文件夹 config
 * 5.国际化文件夹 i18n
 * 6.工具库文件夹 utils
 * 7.提交规范 & 代码规范 husky eslint
 * 8.
 *
 * JWT 登录 & Token 校验
 *
 * 自定义异常
 * 异常过滤器
 *
 * 日志
 *
 * 全局中间件
 * 全局守卫
 * 全局装饰器
 *
 * 接口定义规范
 *
 * 查询全部 @Get(page)
 * 查询单个 @Get(id/:id)
 * 创建 @Post('create')
 * 更新 @Put('update')
 * 删除 @Delete('delete/:id')
 *
 * 权限篇
 * 1.登录立即查询用户权限列表
 * 2.存储权限列表
 * 3.接口拦截对比权限
 */
