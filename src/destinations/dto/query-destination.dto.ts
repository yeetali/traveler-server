import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { CreateDestinationDto } from './create-destination.dto';
import { IsEnum, IsOptional } from 'class-validator';

enum OrderBy {
  NAME = 'name',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class QueryDestinationDto extends IntersectionType(
  PartialType(OmitType(CreateDestinationDto, ['media'])),
  QueryDto,
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
