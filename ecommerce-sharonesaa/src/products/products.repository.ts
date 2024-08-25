import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(skip: number, take: number): Promise<Product[]> {
    return this.productRepository.find({
      skip: isNaN(skip) ? 0 : skip,
      take: isNaN(take) ? 10 : take,
    });
  }

  async getById(id: string) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.productRepository.findOne({ where: { name } });
  }

  
  async updateProduct(id: string, updateProduct: Partial<Product>) {
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

  create(productData: Partial<Product>) {
    return this.productRepository.create(productData);
  }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

}
