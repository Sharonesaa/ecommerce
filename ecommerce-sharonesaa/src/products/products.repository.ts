import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(skip: number, take: number): Promise<Product[]> {
    return this.productRepository.find({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 5 : take,
      relations: ['category'],
    });
  }

  async getById(id: string) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }
 
  async updateProduct(id: string, updateProduct: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, updateProduct);
    return this.getById(id);  
  }

  async deleteProduct(id: string) {
    const product = await this.getById(id);
    if (product) {
      await this.productRepository.remove(product);
      return product;
    }
    return null;
  }

}
