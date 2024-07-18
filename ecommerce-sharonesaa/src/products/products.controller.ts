import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ValidationInterceptor } from '../validation.interceptor';
import { ProductDto } from '../Dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  @HttpCode(200)
  getProductById(@Param('id') id: string) {
    return this.productsService.getById(Number(id));
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(new ValidationInterceptor(ProductDto))
  async createProduct(@Body() createProductDto: ProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return { id: product.id };
  }

  @Put(':id')
  @HttpCode(200)
  @UseInterceptors(new ValidationInterceptor(ProductDto))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    const product = await this.productsService.updateProduct(Number(id), updateProductDto);
    return { id: product.id };
  }


  @Delete(':id')
  @HttpCode(200)
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productsService.deleteProduct(Number(id));
    return { id: product.id };
  }
}

