import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, Max } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page: number;

  @Field(() => Int, { defaultValue: 20 })
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit cannot exceed 100' })
  limit: number;
}
