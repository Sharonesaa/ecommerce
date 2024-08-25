import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers:[ProductsController],
  providers: [ProductsService, ProductsRepository,JwtService],
  exports: [ProductsService, ProductsRepository],  // Exporta el repositorio aquí
})
export class ProductsModule {}
