import { Controller, Get, Param, Res } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-reports.service';

@Controller('pdf-reports')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Get(':type/:id')
  // url should be http://localhost:3000/pdf-reports/:type/:id
  async findOne(
    @Res() res,
    @Param('id') id: string,
    @Param('type') type: string,
  ) {
    res.setHeader('Content-Type', 'application/pdf');
    const pdfData = await this.pdfGeneratorService.findOne(type, id);
    res.send(pdfData);
    return;
  }
}
