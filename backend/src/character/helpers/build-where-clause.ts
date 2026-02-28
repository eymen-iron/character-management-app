import { Prisma } from '@prisma/client';
import { CharacterFilterInput } from '../dto/character-filter.input';

export function buildWhereClause(
  filter?: CharacterFilterInput,
): Prisma.CharacterWhereInput {
  const where: Prisma.CharacterWhereInput = {};

  if (!filter) return where;

  if (filter.status?.length) {
    where.status = { in: filter.status };
  }

  if (filter.gender?.length) {
    where.gender = { in: filter.gender };
  }

  if (filter.search) {
    where.OR = [
      { name: { contains: filter.search } },
      { description: { contains: filter.search } },
    ];
  }

  return where;
}
