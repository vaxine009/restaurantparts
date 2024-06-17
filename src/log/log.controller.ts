import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('sendEmail/:subject/:body')    
  sendEmail(@Param('subject') subject: string, @Param('body') body: string) {
    if (subject && body)
      return this.logService.sendEmail(subject, body);
    else
      return 'subject or body cannot be empty';
  }
  
}
