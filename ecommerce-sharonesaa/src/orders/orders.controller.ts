// orders.controller.ts
import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe,UseGuards} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth.guard';
import { CreateOrderDto } from './CreateOrderDto';
import { OrdersService } from './orders.service';
import { User } from '../users/users.entity';
import { Order } from './order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()  
  @Post()
  @UseGuards(JwtAuthGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products } = createOrderDto;
    return this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Get('user/:userId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserWithOrders(@Param('id') id: string): Promise<User> {
    return this.ordersService.getUserWithOrders(id);
  }
}