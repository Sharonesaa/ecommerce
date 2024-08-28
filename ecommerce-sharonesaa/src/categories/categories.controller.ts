import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './categories.dto'
import { ApiTags } from '@nestjs/swagger';


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

}
