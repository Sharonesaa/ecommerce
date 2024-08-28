import { CategoriesModule } from '../categories/categories.module';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers:[ProductsController],
  providers: [ProductsService, ProductsRepository,JwtService],
  exports: [ProductsService, ProductsRepository], 
})
export class ProductsModule {}
