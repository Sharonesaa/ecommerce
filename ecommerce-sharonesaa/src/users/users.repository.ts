import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './CreateUser.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
      select: ['id', 'name', 'email', 'phone', 'country', 'address', 'isAdmin', 'city'],
    });
  }

  async getUsers(skip: number, take: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
      select: ['id', 'name', 'email', 'phone', 'country', 'address', 'isAdmin', 'city'],
      
    });
  }

  async updateUser(id: string, updateUserDto: CreateUserDto): Promise<Partial<User>> {
    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findOneById(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
