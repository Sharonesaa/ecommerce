import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable, OneToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/products.entity';

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
