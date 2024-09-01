import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.entity';
import { categories } from '../seeds/preload.data';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories() {
    return this.categoriesRepository.getCategories();
  }

  
  async addCategories(categoryDto: CategoryDto): Promise<Category> {
    const existingCategory = await this.categoriesRepository.findOne({ where: { name: categoryDto.name } });
    
    if (existingCategory) {
      throw new Error(`Category with name ${categoryDto.name} already exists`);
    }
  
    const newCategory = this.categoriesRepository.create(categoryDto);
    return this.categoriesRepository.addCategories(newCategory);
  }
  

}
