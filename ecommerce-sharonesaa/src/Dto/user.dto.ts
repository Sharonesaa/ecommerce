import { IsEmail, IsString, IsNumber, IsBoolean, Length } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @Length(5, 20)
  password: string;

  @IsString()
  address: string;

  @IsNumber()
  phone: number;

  @IsString()
  country: string;

  @IsString()
  city: string;
}
