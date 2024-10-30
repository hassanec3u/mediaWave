import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Remplacez par l'URL de votre front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Utiliser le ValidationPipe globalement
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();