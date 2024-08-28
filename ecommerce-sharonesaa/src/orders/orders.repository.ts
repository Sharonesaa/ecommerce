import { Product } from '../products/products.entity';
import { OrderDetail } from './order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addOrder(userId: string, productIds: string[]): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
  
    const newOrder = this.orderRepository.create({ user });
    await this.orderRepository.save(newOrder);

    const products = await this.productRepository.findByIds(productIds);

    // Crea un solo detalle de orden
    const orderDetail = this.orderDetailRepository.create({
      order: newOrder,
      products: [],
      price: 0,
    });
  
    for (const product of products) {
      if (product.stock > 0) {
        // Actualiza el stock
        product.stock -= 1;
        await this.productRepository.save(product);
  
        // Agrega el producto al detalle de la orden
        orderDetail.products.push(product);
  
        // Actualiza el precio en el detalle de la orden
        orderDetail.price += Number(product.price);
      }
    }
  
    // Guarda el detalle de la orden
    await this.orderDetailRepository.save(orderDetail);
  
    // Actualiza la orden con el monto total desde orderDetail
   
    await this.orderRepository.save(newOrder);
  
    return newOrder;
  }

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetail', 'orderDetail.products'],
    });
  }

  async getUserWithOrders(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
      select: {
        id: true,
        orders: {
          id: true,
          date: true,
        },
      },
    });
  }
}
