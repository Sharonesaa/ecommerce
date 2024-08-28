import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmconfig from './config/typeorm'
import { Category } from './categories/categories.entity';
import { Product } from './products/products.entity';
import { SeedService } from './seeds/preload.service';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { RolesGuard } from './guards/RolesGuard';
import { User } from './users/users.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load : [typeOrmconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        configService.get('typeorm')
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    CategoriesModule,
    FileUploadModule,
    TypeOrmModule.forFeature([Category, Product, User]),
  ],
  controllers: [],
  providers: [SeedService,CloudinaryService,RolesGuard],
  exports: [],
})
export class AppModule {}
