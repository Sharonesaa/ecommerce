import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { SeedService } from './seeds/preload.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Esta opción está bien, es un booleano.
      forbidNonWhitelisted: true, // Esta opción también es un booleano.
      transform: true,          // Aquí es donde el tipo booleano está permitido.
    }),
  )
  app.use(loggerGlobal);
  const seedService = app.get(SeedService);
  await seedService.runSeed();

  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('The API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
    
  await app.listen(3000);
  }
bootstrap();

