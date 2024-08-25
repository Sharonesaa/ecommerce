import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../orders/orders.repository';
import { Order } from '../orders/order.entity';
import { OrderDetail } from '../orders/order-detail.entity';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository,JwtService],
})
export class OrdersModule {}
