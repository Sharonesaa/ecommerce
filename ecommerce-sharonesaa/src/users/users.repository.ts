import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './CreateUser.dto';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Métodos personalizados
  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getUsers(skip: number, take: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 10 : take,
    });
  }
}
