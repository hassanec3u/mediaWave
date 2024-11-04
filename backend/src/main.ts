import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });




  const config = new DocumentBuilder()
      .setTitle('MediaWave API Backend')
      .setDescription('API pour afficher les routes et les méthodes de l\'application MediaWave')
      .setVersion('1.0')
      .addBearerAuth()  // Ajout d'une authentification par token
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Utiliser le ValidationPipe globalement
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();