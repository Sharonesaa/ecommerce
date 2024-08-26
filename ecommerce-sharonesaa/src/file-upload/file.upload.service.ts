import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import { ProductsRepository } from '../products/products.repository';
import { UploadFileDto } from './dto/upload-file.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async uploadFileToProduct(file: UploadFileDto, id: string) {
    // Pass only the buffer and originalname to uploadFile
    const url = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
    await this.productsRepository.updateProduct(id, { imgUrl: url });
    return { imgUrl: url };
  }
}
