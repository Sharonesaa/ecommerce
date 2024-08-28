import { Controller, Post, Body, Param, HttpCode, UsePipes, ValidationPipe,Get, Query, Put,Delete } from '@nestjs/common';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { FindOneParams } from '../dto/FindOneParams';
import { JwtAuthGuard } from '../guards/auth.guard'
import { ProductDto } from './product.dto'; 
import { UseGuards } from '@nestjs/common';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async getProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.getProduct(id);
  }
  
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createProduct(
    @Body() createProductDto: ProductDto,
  ) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    const updatedProduct = await this.productsService.updateProduct(id, updateProductDto);
    return {
      status: 'OK',
      msg: `Modified product ${updatedProduct.id}`,
      product: updatedProduct, // Devuelve el producto actualizado, incluyendo la categoría
    };
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
    return {'status':'OK','msg':`Product removed ${id}`}
  }
}

