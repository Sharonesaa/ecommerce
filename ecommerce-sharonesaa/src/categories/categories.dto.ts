import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString , IsArray, ArrayMinSize} from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: 'd3c9b85f-8580-46c6-9c77-69f8b7db12a6'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of product IDs ',
    type: [String],
    example: ['4a27d7d3-1a1d-4d7d-9e2e-7b7e6e0e9f3d', '4a27dfgd3-1a1d-4d7d-9e2e-7b7e6e0e9f3d'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  products: string[];

}