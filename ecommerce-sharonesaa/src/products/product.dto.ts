import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {

  @ApiProperty({
    description: 'Unique identifier of the user who places the order',
    example: 'e5b7d9e0-3b3e-4c5f-bebc-865a3f3d0b47',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  

  @ApiProperty({
    description: 'Description of the product',
    example: 'A high-performance laptop with 16GB RAM and 512GB SSD.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: 'Price of the product in USD',
    example: 999.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  
  @ApiProperty({
    description: 'Image URL of the product',
    example: 'http://example.com/laptop.jpg',
  })
  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @ApiProperty({
    description: 'Stock quantity of the product',
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number
}