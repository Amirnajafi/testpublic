import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, Max, IsOptional } from 'class-validator';

export class PostTestBodyDto {
  @IsString()
  @IsNotEmpty()
  @Min(10)
  @Max(50)
  @ApiProperty({
    description: 'The title of the product',
    minLength: 10,
    maxLength: 50,
    example: 'This is Products one',
    default: '',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'The description of the product',
    example: 'This is Products one',
    default: '',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Page size of the list',
    example: 20,
    default: 10,
  })
  pageSize?: number = 10;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Current page of the list',
    example: 2,
    default: 1,
  })
  page?: number = 1;
}
