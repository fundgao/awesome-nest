import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    required: false,
    description: '主键',
  })
  id: number;

  @ApiProperty({
    required: false,
    description: '角色名称',
  })
  role_name: string;

  @ApiProperty({
    required: false,
    description: '角色ID',
  })
  role_id: string;

  @ApiProperty({
    required: false,
    description: '角色描述',
  })
  description: string;
}
