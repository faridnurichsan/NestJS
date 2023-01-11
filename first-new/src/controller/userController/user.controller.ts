import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/services/userService/user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Post()
  createUser(@Body() body) {
    return this.userService.createUser(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: any) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
  @Post('login')
  async createUserToken(@Body() body): Promise<any> {
    const user = await this.userService.findByUser(body.username);
    if (!user) {
      return {
        message: 'User not found',
      };
    } else {
      return this.userService.createUserToken(body, user);
    }
  }

  // @Post('login')
  // Login();
}
