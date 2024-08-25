import { Controller, Post, UploadedFile , UseInterceptors, Param, UseGuards} from "@nestjs/common";
import { FileUploadService } from "./file.upload.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/auth.guard';
import { ApiTags } from "@nestjs/swagger";


@ApiTags('UploadImage')
@Controller('uploadImage')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    ) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    
    return await this.fileUploadService.uploadFileToProduct(file, id);
  }
}