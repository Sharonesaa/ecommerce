import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async addCategories(category: Category): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async findOne(options: FindOneOptions<Category>) {
    return await this.categoryRepository.findOne(options);
  }

  create(categoryData: Partial<Category>) {
    return this.categoryRepository.create(categoryData);
  }

  async getById(id: string): Promise<Category | null> {
    return await this.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.findOne({ where: { name } });
  }

}
