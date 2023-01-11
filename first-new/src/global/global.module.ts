import { Module } from '@nestjs/common';
import { UserController } from '../controller/userController/user.controller';
import { UserService } from '../services/userService/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../model/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
})
export class GlobalModule {}
