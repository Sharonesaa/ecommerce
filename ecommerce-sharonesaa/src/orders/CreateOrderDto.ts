import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Unique identifier of the user who places the order',
    example: 'e5b7d9e0-3b3e-4c5f-bebc-865a3f3d0b47',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'List of product IDs in the order',
    type: [String],
    example: ['4a27d7d3-1a1d-4d7d-9e2e-7b7e6e0e9f3d', '4a27dfgd3-1a1d-4d7d-9e2e-7b7e6e0e9f3d'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  products: string[];
}
