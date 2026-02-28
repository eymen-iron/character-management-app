import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFilterInput } from './dto/character-filter.input';
import { PaginationInput } from './dto/pagination.input';
import { CharacterResponse } from './models/paginated-characters.model';
import { buildWhereClause } from './helpers/build-where-clause';
import { CharacterEntity } from './types/character.types';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pagination: PaginationInput,
    filter?: CharacterFilterInput,
  ): Promise<CharacterResponse> {
    const where = buildWhereClause(filter);
    const skip = (pagination.page - 1) * pagination.limit;

    const [items, total] = await Promise.all([
      this.prisma.character.findMany({
        where,
        skip,
        take: pagination.limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.character.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      success: true,
      message: `Found ${total} characters`,
      data: {
        items: items as CharacterEntity[],
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages,
          hasNext: pagination.page < totalPages,
          hasPrev: pagination.page > 1,
        },
      },
    };
  }
}
