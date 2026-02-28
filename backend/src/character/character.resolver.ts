import { Resolver, Query, Args } from '@nestjs/graphql';
import { CharacterResponse } from './models/paginated-characters.model';
import { CharacterService } from './character.service';
import { CharacterFilterInput } from './dto/character-filter.input';
import { PaginationInput } from './dto/pagination.input';

@Resolver()
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => CharacterResponse, { name: 'characters' })
  async getCharacters(
    @Args('pagination', { nullable: true, defaultValue: { page: 1, limit: 20 } })
    pagination: PaginationInput,
    @Args('filter', { nullable: true })
    filter?: CharacterFilterInput,
  ) {
    return this.characterService.findAll(pagination, filter);
  }
}
