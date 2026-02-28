import { ObjectType, Field } from '@nestjs/graphql';
import { Character } from './character.model';
import { PaginationMeta } from '../../common/models/pagination-meta.model';

@ObjectType()
export class CharacterPaginatedData {
  @Field(() => [Character])
  items: Character[];

  @Field(() => PaginationMeta)
  pagination: PaginationMeta;
}

@ObjectType()
export class CharacterResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => CharacterPaginatedData)
  data: CharacterPaginatedData;
}
