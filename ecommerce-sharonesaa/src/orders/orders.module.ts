import { OrdersRepository } from '../orders/orders.repository';
import { OrdersController } from '../orders/orders.controller';
import { OrderDetail } from '../orders/order-detail.entity';
import { OrdersService } from '../orders/orders.service';
import { Product } from '../products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/order.entity';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository,JwtService],
})
export class OrdersModule {}
