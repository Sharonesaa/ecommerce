import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPassword123!'
  })
  @IsString()
  @IsNotEmpty()
  password: string;


  @ApiProperty({
    description: 'The phone number of the user',
    example: 1234567890,
  })
  @IsNumber()
  phone : number;


  @ApiProperty({
    description: 'The country of the user',
    example: 'USA',
    required: true
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Anytown, USA',
    required: true
  })
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Whether the user is an admin', default: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiProperty({
    description: 'The city of the user',
    example: 'New York',
    required: true
  })
  @IsString()
  city?: string;
}
