/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { HttpModule } from './http/http.module';
import { ConfigService } from '@nestjs/config';
import { LogService } from './log/log.service'
import { setting } from './setting';
import { CookieSessionModule } from 'nestjs-cookie-session';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),  DatabaseModule,LogModule, HttpModule,
    CookieSessionModule.forRoot({ session: { secret: 'DxjQt1aGRSjX22GMLfbKVKmO8CIEgSVY', maxAge: 60*60*1000  } })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {

  constructor() {
  }
}
