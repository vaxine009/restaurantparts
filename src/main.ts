/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';

//import { basicAuthenticate } from './authentication/basicAuthentication'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbs.registerHelper('IsEven', function (index) {
    return index % 2 === 0;
  });
  hbs.registerHelper('getImageUrl', function (simage, id) {
    return id ? `images/parts_design/special/Hirim/${simage.replace('.jpg', '.png')}` : `parts_design/special/sheet/${simage.replace('.jpg', '.png')}`;
  });
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  hbs.registerHelper('eq', (a, b) => a === b);
  hbs.registerHelper('safeJson', function(context) {
    return JSON.stringify(context);
  });

  hbs.registerHelper('lt', function (v1: number, v2: number) {
    return v1 < v2;
  });

  app.setViewEngine('hbs');
  await app.listen(3001);
}
bootstrap();