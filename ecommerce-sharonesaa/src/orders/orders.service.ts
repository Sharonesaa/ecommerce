// orders.service.ts
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './order.entity';
import { User } from '../users/users.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(userId: string, productIds: string[]): Promise<Order> {
    return this.ordersRepository.addOrder(userId, productIds);
  }

  async getOrder(id: string): Promise<Order> {
    return this.ordersRepository.getOrder(id);
  }

  async getUserWithOrders(userId: string): Promise<User> {
    return this.ordersRepository.getUserWithOrders(userId);
  }
}
