import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Pegawai')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mathadd')
  add(): number {
    return this.appService.add();
  }
  @Get('mathsubs')
  subs(): number {
    return this.appService.subs();
  }
  @Get('mathmutli')
  multiply(): number {
    return this.appService.multiply();
  }
}
