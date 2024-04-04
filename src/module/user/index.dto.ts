import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: false,
    description: '主键',
  })
  id: number;

  @ApiProperty({
    required: false,
    description: '',
  })
  user_id: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  user_name: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  password: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  role_id: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  nickname: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  phone_number: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  email: string;

  @ApiProperty({
    required: false,
    description: '',
  })
  avatar: string;

  @ApiProperty({
    required: false,
    description: '角色描述',
  })
  description: string;
}
