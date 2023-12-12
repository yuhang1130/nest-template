import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import * as compression from "compression";
import helmet from "helmet";
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: (+process.env.DEBUG || process.env.ENV_FLAG === 'local')  ? ['log', 'error', 'warn', 'debug'] : ['error', 'warn']
  });
  app.enableShutdownHooks();
  app.enableCors();
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(10 * 60e3);
    next();
  });
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port).then(() => {
    console.log(`Server Start: http://localhost:${port}`)
  })
}
bootstrap().then();
