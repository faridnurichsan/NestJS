import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const server = await NestFactory.create(MainModule);
  const port = process.env.PORT || 3010;
  await server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}
bootstrap();
