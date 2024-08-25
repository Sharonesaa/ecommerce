import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Product } from '../products/products.entity';
import { categories, products } from './preload.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async runSeed() {
    await this.loadCategories();
    await this.loadProducts();
  }

  private async loadCategories() {
    for (const categoryData of categories) {
      // Verificar si la categoría ya existe en la base de datos
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: categoryData.name },
      });
  
      // Si la categoría no existe, crearla y guardarla
      if (!existingCategory) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
    }
  }

  private async loadProducts() {
    for (const productData of products) {
      // Verificar si la categoría existe
      const category = await this.categoryRepository.findOne({
        where: { id: productData.categoryId },
      });
  
      // Verificar si el producto ya existe
      const existingProduct = await this.productRepository.findOne({
        where: { name: productData.name },
      });
  
      // Si la categoría existe y el producto no existe, crearlo
      if (category && !existingProduct) {
        const newProduct = this.productRepository.create({
          ...productData,
          category,
        });
        await this.productRepository.save(newProduct);
      }
    }
  }
}
