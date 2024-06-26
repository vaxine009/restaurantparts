import { Controller, Get, Param, ParseIntPipe, Query, Render ,Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get()
  @Render('pages/index')
  async root(@Request() req: any) {
    return { parts: null };
  }

  @Get('cron')
  getCron() {
    return this.appService.getCron();
  }

  @Get('privacy')
  @Render('pages/privacy')
  async privacy(@Request() req: any) {
    return;
  }

  @Get('categories')
  @Render('pages/categories')
  async categories(@Request() req: any) {
    return { parts: await this.appService.getParts() };
  }

  @Get('partdetails')
  @Render('pages/partdetails')
  async partdetails(@Request() req: any, @Query() queryParams: any) {
    let searchterm = queryParams.searchterm;
    let categoryId = queryParams.categoryId;
    return { parts: await this.appService.getPartsDetails(searchterm, categoryId), searchterm :searchterm };
  }

  @Get('part/:id')
  @Render('pages/part')
  async partById(@Param('id', ParseIntPipe) id: number) {
    if (!id) return { part: null }

    const partDetails = await this.appService.getPartDetails(id);
    return { part: partDetails };
  }
}
