import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryTestDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    example: '1',
  })
  page: string = '1';

  @IsOptional()
  @ApiProperty({
    required: false,
    example: '10',
  })
  page_size: string = '10';
}
