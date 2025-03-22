import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 100;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
} 