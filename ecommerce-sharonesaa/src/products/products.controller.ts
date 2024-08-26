import { Controller, Post, Body, Param, HttpCode, UsePipes, ValidationPipe,Get, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './product.dto'; 
import { JwtAuthGuard } from '../guards/auth.guard'
import { FindOneParams } from '../dto/FindOneParams';
import { UseGuards } from '@nestjs/common';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  async getProduct(@Param() params: FindOneParams): Promise<ProductDto> {
    return this.productsService.getProduct(params.id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    const product = await this.productsService.updateProduct(id, updateProductDto);
    return { id: product.id };
  }
  
  //ESTA RUTA SOLO FUNCIONA PARA PRECARGAR CATEGORIA PRODUCTOS AL INICIALIZAR BASE DE DATP
  // @Post('seeder')
  // async loadProducts() {
  //   await this.productsService.loadProducts();
  //   return { message: 'Products loaded successfully' };
  // } 
}