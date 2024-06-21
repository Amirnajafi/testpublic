import { PostTestBodyDto } from './dto/testBody.dto';
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { QueryTestDto } from './dto/queryTestDto.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(@Query() { page, page_size }: QueryTestDto): string {
    // this.logger.error('Hello World test logger how to use', 'AppController');
    console.log(`the page is ${page} and the page_size is ${page_size}`);
    return this.appService.getHello();
  }
  @Get('testParams/:id')
  getTestParams(@Param('id') id: string): string {
    return this.appService.testParams(id);
  }

  @Post('testBody')
  getTestBody(@Body() testBody: PostTestBodyDto): any {
    return testBody;
  }
}
