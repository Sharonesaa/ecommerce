import { Entity, PrimaryGeneratedColumn, Column, OneToOne,JoinColumn, ManyToOne } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { User } from '../users/users.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  @JoinColumn()
  orderDetail: OrderDetail;
}
