import { Injectable, UploadedFile } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';
import { CategoriesService } from '../categories/categories.service';
import { products } from '../seeds/preload.data';

import { FileUploadService } from 'src/file-upload/file.upload.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
    
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

  async createProduct(createProduct: Product) {
    const existingProduct = await this.productsRepository.findByName(createProduct.name);
  
    if (existingProduct) {
      throw new Error(`Product with name ${createProduct.name} already exists`);
    }
    return await this.productsRepository.createProduct(createProduct);
  }

  async updateProduct(id: string, updateProduct: Partial<Product>) {
    return await this.productsRepository.updateProduct(id, updateProduct);
  }

  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  // async loadProducts() {
  //   for (const productData of products) {
  //     const existingProduct = await this.productsRepository.findByName(productData.name);
  //     if (!existingProduct) {
  //       const categories = await this.categoriesService.getCategories();
  //       const category = categories.find(cat => cat.id === productData.categoryId);
  //         if (category) {
  //           const product = this.productsRepository.create(productData);
  //           product.category = category; 
  //           await this.productsRepository.createProduct(product);
  //         }
  //       }
  //     }
    // }
    
  }