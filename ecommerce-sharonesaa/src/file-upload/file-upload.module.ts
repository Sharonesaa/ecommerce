import { Module } from '@nestjs/common';
import { FileUploadService } from './file.upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import { ProductsModule } from '../products/products.module';  // Importa ProductsModule aquí
import { CategoriesModule } from '../categories/categories.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ProductsModule, CategoriesModule],  // Asegúrate de que ProductsModule esté importado
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryService, JwtService],
})
export class FileUploadModule {}
