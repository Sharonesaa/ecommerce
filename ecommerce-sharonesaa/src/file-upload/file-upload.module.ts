import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import { CategoriesModule } from '../categories/categories.module';
import { FileUploadController } from './file-upload.controller';
import { ProductsModule } from '../products/products.module';  
import { FileUploadService } from './file.upload.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductsModule, CategoriesModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryService, JwtService],
})
export class FileUploadModule {}
