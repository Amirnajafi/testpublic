import { LoggerMiddleware } from '../logger/logger.middleware';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'src/logger/logger.module';
import { PdfGeneratorModule } from 'src/pdf-reports/pdf-reports.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    PdfGeneratorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Create Logger for HTTP requests
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
