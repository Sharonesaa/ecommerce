import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './CreateUser.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.getUsers((page - 1) * limit, limit);
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository.getById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<Partial<User>> {
    await this.usersRepository.updateUser(id, updateUserDto);

    const updatedUser = await this.usersRepository.getById(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Excluir el campo 'password'
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }


  async deleteUser(id: string): Promise<void> {
    return this.usersRepository.deleteUser(id);
  }
}
