import { Character as PrismaCharacter } from '@prisma/client';
import { Status, Gender } from '../models/character.model';

export type CharacterEntity = Omit<PrismaCharacter, 'status' | 'gender'> & {
  status: Status;
  gender: Gender;
};
