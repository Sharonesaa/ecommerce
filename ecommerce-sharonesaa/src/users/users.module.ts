import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { RolesGuard } from '../guards/RolesGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtService,RolesGuard],
  exports: [UsersService, UsersRepository ],
})
export class UsersModule {}
