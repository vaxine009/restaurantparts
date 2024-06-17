import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('/testMySQLConnection')
  testMySQLConnection() {
    return this.databaseService.testMySQLConnection();
  }
}
