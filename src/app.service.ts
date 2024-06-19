import { Injectable } from '@nestjs/common';
import { CategoriesDto, PartsDetailsDto } from './DTOs';
import { DatabaseService } from './database/database.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from './http/http.service';

@Injectable()
export class AppService {
  async getPartsDetails(searchterm: any, categoryId: any) : Promise<PartsDetailsDto[]> {

    if (!searchterm && !categoryId) {
      return null;
    }

    let whereClauses: string[] = [];
    let whereClause = "";

    if (searchterm) {
      whereClauses.push(`description LIKE '%${searchterm}%'`);
    }
    if (categoryId) {
      whereClauses.push(`categoryId = ${categoryId}`);
    }

    if (whereClauses.length > 0) {
      whereClause = "WHERE " + whereClauses.join(" AND ");
    } else {
      whereClause = "";
    }

    let sql = `SELECT I.*, S.sname FROM inventory I INNER JOIN specialsize S ON I.categoryId = S.id ${whereClause} ORDER BY description ASC`;
    let results = await this.databaseService.queryMySql(sql, []);

    let dtolist: PartsDetailsDto[] = [];

    for (let i: number = 0; i < results.length; i++) {
      let dto: PartsDetailsDto = new PartsDetailsDto();
      dto.id = results[i]['id'];
      dto.description = results[i]['description'];
      dto.category = results[i]['sname'];
      dto.price = results[i]['price'];
      dto.quantity = results[i]['quantity'];
      dto.mainPicture = results[i]['mainPicture'];
      dto.picture2 = results[i]['picture2'];
      dto.picture3 = results[i]['picture3'];
      dto.picture4 = results[i]['picture4'];
      dto.picture5 = results[i]['picture5'];

      dtolist.push(dto);
    }

    return dtolist
  }

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly httpService: HttpService

  ) { }

  getCron(): string {
    return 'Cron is running!';
  }

  async getParts(): Promise<CategoriesDto[]> {
    let sql = `SELECT * FROM specialsize ORDER BY sname ASC`;
    let results = await this.databaseService.queryMySql(sql, []);

    let dtolist: CategoriesDto[] = [];

    for (let i: number = 0; i < results.length; i++) {
      let dto: CategoriesDto = new CategoriesDto();
      dto.id = results[i]['id'];
      dto.sname = results[i]['sname'];
      dto.content = results[i]['content'];
      dto.simage = results[i]['simage'];

      dtolist.push(dto);
    }

    return dtolist

  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    console.log("test cron every 10 mins: " + process.env.SITE_URL + "/cron");
    try {
      let res = await this.httpService.get(process.env.SITE_URL + "/cron");
      console.log("response: " + res.data);
    }
    catch (err) {
      console.log("error:" + err);
    }
  }

}
