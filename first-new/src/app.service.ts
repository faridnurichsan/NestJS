import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  add(): number {
    return 3 + 2;
  }

  subs(): number {
    return 5 - 2;
  }

  multiply(): number {
    return 3 * 2;
  }
}
