import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MainModule {}
