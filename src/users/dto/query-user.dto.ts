import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { User } from '../entities/user.entity';
import { IsEnum, IsOptional } from 'class-validator';

enum OrderBy {
  CREATED_AT = 'createdAt',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
}
export class QueryUsersDto extends IntersectionType(
  QueryDto,
  PartialType(PickType(User, ['firstName', 'lastName', 'email'])),
) {
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;
}
