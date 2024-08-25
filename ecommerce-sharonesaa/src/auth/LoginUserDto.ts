import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';


export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPassword123!',
    minLength: 6,
  })
  @IsString()
  password: string;
}
