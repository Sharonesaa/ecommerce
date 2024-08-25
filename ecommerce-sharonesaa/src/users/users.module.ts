import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../guards/RolesGuard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtService,RolesGuard],
  exports: [UsersService, UsersRepository ],
})
export class UsersModule {}
