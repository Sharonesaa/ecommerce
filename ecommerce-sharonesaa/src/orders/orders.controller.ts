// orders.controller.ts
import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe,UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { User } from '../users/users.entity';
import { FindOneParams, FindUserParams } from '../dto/FindOneParams';
import { CreateOrderDto } from './CreateOrderDto';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products } = createOrderDto;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOrder(@Param() params: FindOneParams): Promise<Order> {
    return this.ordersService.getOrder(params.id);
  }

  @Get('user/:userId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserWithOrders(@Param() params: FindUserParams): Promise<User> {
    return this.ordersService.getUserWithOrders(params.userId);
  }
}