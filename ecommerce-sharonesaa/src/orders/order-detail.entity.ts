import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable, OneToOne } from 'typeorm';
import { Product } from '../products/products.entity';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
