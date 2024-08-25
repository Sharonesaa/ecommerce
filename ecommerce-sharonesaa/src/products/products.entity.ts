import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,

} from 'typeorm';
import{v4 as uuid} from 'uuid';
import { Category } from '../categories/categories.entity';
import { OrderDetail } from '../orders/order-detail.entity';

@Entity('products')  // Nombre de la tabla en la base de datos
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid(); // ID único para el producto

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({  type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'default-image.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
