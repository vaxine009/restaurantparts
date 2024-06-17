export const setting = {
    mysqlConnection: null, 
}

export interface IMySqlConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }