import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';
import { CategoryDto } from './categories.dto'
import { ApiTags } from '@nestjs/swagger';
import { categories } from '@/seeds/preload.data';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  async addCategories(@Body() categoryDto: CategoryDto) {
    const categoryData = await this.categoriesService.addCategories(categoryDto);
      return { id: categoryData.id };
  }


  // @Post('seeder')
  // async seedCategories() {
  //   await this.categoriesService.loadCategories();
  //   return { message: 'Categories seeded successfully' };
  // }
}
