import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IsNotEmpty } from "class-validator";
import { HttpService } from './http.service';

class SaveHttpResponseDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  filename: string;
}

@Controller('http')
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  @Get('getAndSaveResponse/:url/:filename') 
  getAndSaveResponse(@Param('url') url:string, @Param('filename') filename:string) {    
    return this.httpService.getAndSaveResponse(url, filename);
  }

  @Post('saveHttpResponse')
  saveHttpResponse(@Body() saveHttpResponseDto: SaveHttpResponseDto) {
    console.log(saveHttpResponseDto.url);
    console.log(saveHttpResponseDto.filename);
    return this.httpService.getAndSaveResponse(saveHttpResponseDto.url, saveHttpResponseDto.filename);
  }

}


