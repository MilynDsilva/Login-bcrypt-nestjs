import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  await app.listen(4000);
}
bootstrap();
