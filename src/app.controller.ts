import { Controller, Get, Param, Render ,Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get()
  @Render('pages/index')
  async root(@Request() req: any) {
    return { parts: null };
  }

  
  @Get('categories')
  @Render('pages/categories')
  async categories(@Request() req: any) {
    return { parts: await this.appService.getParts(), CakeSizeShape: req.query.Cakedesign || '', Ser_Part: req.query.Ser_Part || '' };
  }
}
