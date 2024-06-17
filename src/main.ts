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
  hbs.registerHelper('IsEven', function(index) {
    return index % 2 === 0;
  });

  hbs.registerHelper('getImageUrl', function(simage, id) {
    return id ? `images/parts_design/special/Hirim/${simage.replace('.jpg', '.png')}` : `parts_design/special/sheet/${simage.replace('.jpg', '.png')}`;
  });



  app.setViewEngine('hbs');
  await app.listen(3001);
}
bootstrap();