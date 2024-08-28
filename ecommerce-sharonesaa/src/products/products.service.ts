import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoriesRepository } from '@/categories/categories.repository';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productsRepository.getProducts(skip, limit);
  }
  
  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.getById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(createProductDto: ProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto; 
  
    if (!categoryId) {
      throw new BadRequestException('Falta categoría: Se requiere un ID de categoría válido.');
    }
    const category = await this.categoryRepository.getById(categoryId);

    if (!category) {
      throw new NotFoundException(`Categoría con id ${categoryId} no encontrada`);
    }
  
    const product: Product = {
      ...productData, 
      category: category, 
      orderDetails: [], 
    };
    return await this.productsRepository.createProduct(product); 
  }
  
  async updateProduct(id: string, updateProductDto: ProductDto): Promise<Product> {
    const { categoryId, ...updateData } = updateProductDto;
  
    let category = null;
  
    if (categoryId) {
      category = await this.categoryRepository.getById(categoryId);
      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }
  
    const product = await this.productsRepository.getById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  
    // Actualiza los datos del producto, incluyendo la categoría si es necesario
    Object.assign(product, updateData);
    product.category = category;
  
    return await this.productsRepository.createProduct(product);
  }
  
  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }
    
}