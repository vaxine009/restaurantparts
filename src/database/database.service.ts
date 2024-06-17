import { Injectable } from '@nestjs/common';
import { IMySqlConfig } from '../setting';

@Injectable()
export class DatabaseService {

  async testMySQLConnection() {
    let message: string;
    
    let query1 = `SELECT * FROM specialsize t limit 1`;

    try {
      let results1 = await this.queryMySql(query1, []);
      message = "connection to MySQL is fine";
      console.log(results1);
    }
    catch (err) {
      message = "failed to connect to MySQL. Error:" + JSON.stringify(err);
    }
    return message;
  }


  async queryMySql(selectText: string, selectValues: Array<string>): Promise<object[]> {
    const config: IMySqlConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }

    let promise: Promise<object[]> = new Promise(function (myResolve, myReject) {
      let mysql = require('mysql2');
      let connection = mysql.createConnection(config);
      connection.query(selectText, selectValues, (error, results, fields) => {
        connection.end();
        if (error) {
          myReject(error);
        }
        else {
          myResolve(results as object[]);
        }
      });
    });

    return promise;
  }



}

