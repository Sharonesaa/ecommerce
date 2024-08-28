import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
  } from 'typeorm';
  import{v4 as uuid} from 'uuid';
  import { Product } from '../products/products.entity'

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @OneToOne(() => Product, (product) => product.category)
  product: Product;
}