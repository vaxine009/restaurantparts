import { Module, Global } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';

@Global()
@Module({
  controllers: [HttpController],
  providers: [HttpService],
  exports: [HttpService]
})
export class HttpModule {}
