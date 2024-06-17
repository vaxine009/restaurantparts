import { Injectable } from '@nestjs/common';
import { PartsInfoDto } from './PartsInfoDto';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(
    private readonly databaseService:DatabaseService
    ) {}

  getHello(): string {
    return 'Hello service1!';
  }

  async getParts(): Promise<PartsInfoDto[]> {
    let sql = `SELECT * FROM specialsize ORDER BY id ASC`;
    let results = await this.databaseService.queryMySql(sql, []);

    let dtolist: PartsInfoDto[] = [];

    for (let i: number = 0; i < results.length; i++) {
      let dto: PartsInfoDto = new PartsInfoDto();
      dto.id = results[i]['id'];
      dto.sname = results[i]['sname'];
      dto.content = results[i]['content'];
      dto.simage = results[i]['simage'];

      dtolist.push(dto);
    }

    return dtolist

  }
  
}
