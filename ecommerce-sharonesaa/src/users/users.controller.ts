import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards,UsePipes,ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ValidationInterceptor } from '../validation.interceptor';
import { ValidationPipe, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags,ApiQuery } from '@nestjs/swagger';
import { Roles} from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/RolesGuard';
import { CreateUserDto } from './CreateUser.dto';
import { UsersService } from './users.service';
import { Role } from '../roles.enum';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: false, schema: { default: 1 } })
  @ApiQuery({ name: 'limit', required: false, schema: { default: 5 } })
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number ,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.usersService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  getAdmin(){
    return 'ruta protegida';
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  //Este post esta solo por asignación de la homework, en ralidad dla creación de usuario debe hacerse por auth/signUp
  @Post()
  @HttpCode(201)
  @UseInterceptors(new ValidationInterceptor(CreateUserDto))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { id: user.id };
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HttpCode(200)
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const user = await this.usersService.updateUser(id, updateUserDto);
    return {'status':'OK','msg':`User removed with ${id}`};
  }
  
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {'status':'OK','msg':`User removed ${id}`};
  }
}
