import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { CreateUserDto } from '../users/CreateUser.dto';
import { Role } from '../roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async signUp(user: CreateUserDto) {
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.usersService.createUser({ ...user, password: hashedPassword });
      return { success: 'User created successfully',...newUser };
    } catch (error) {
      throw new BadRequestException('Error hashing password');
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    try {
      const payload = { 
        username: user.email, 
        sub: user.id,
        roles : [user.isAdmin ? Role.Admin : Role.User] };
      const token = this.jwtService.sign(payload);
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 60); 
      
      return { message: 'Login successful', token, expiresIn: expiration.toISOString(), };
    }catch (error) {
      throw new BadRequestException('Error during sign in');
    }
  }
}
