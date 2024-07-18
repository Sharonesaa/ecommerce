import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ValidationInterceptor } from '../validation.interceptor';
import { UserDto } from '../Dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(new ValidationInterceptor(UserDto))
  async createUser(@Body() createUserDto: UserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { id: user.id };
  }

  @Put(':id')
  @HttpCode(200)
  @UseInterceptors(new ValidationInterceptor(UserDto))
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    const user = await this.usersService.updateUser(Number(id), updateUserDto);
    return { id: user.id };
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(Number(id));
    return { id: user.id };
  }
}