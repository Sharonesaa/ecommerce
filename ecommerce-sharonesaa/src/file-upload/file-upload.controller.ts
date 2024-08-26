import { Controller, Post, UploadedFile, UseInterceptors, Param, UseGuards } from "@nestjs/common";
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from "./file.upload.service";
import { JwtAuthGuard } from '../guards/auth.guard';

@ApiTags('UploadImage')
@Controller('uploadImage')
@ApiBearerAuth()  // Esto agrega el candado para la autenticación JWT
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')  // Indica que el endpoint consume multipart/form-data
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
 
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadFileToProduct(file, id);
  }
}
