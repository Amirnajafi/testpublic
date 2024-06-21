import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-reports.service';
import { PdfGeneratorController } from './pdf-reports.controller';

@Module({
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService],
})
export class PdfGeneratorModule {}
