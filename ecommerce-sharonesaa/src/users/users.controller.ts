import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards,UsePipes,ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './CreateUser.dto';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ValidationPipe, UseInterceptors } from '@nestjs/common';
import { FindOneParams } from '../dto/FindOneParams'
import { ValidationInterceptor } from '../validation.interceptor';
import { Role } from '../roles.enum';
import { Roles} from '../decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from "../guards/RolesGuard";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.usersService.getUsers(page, limit);
  }

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  getAdmin(){
    return 'ruta protegida';
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  findOne(@Param() params: FindOneParams) {
    return this.usersService.getById(params.id);
  }

 
  @Post()
  @HttpCode(201)
  @UseInterceptors(new ValidationInterceptor(CreateUserDto))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { id: user.id };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return { id: user.id };
  }
  
  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(@Param() params: FindOneParams) {
    await this.usersService.deleteUser(params.id);
    return { id: params.id };
  }
}
