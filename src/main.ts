import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:50993'], // Replace with your Flutter web URL from flutter run output
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
